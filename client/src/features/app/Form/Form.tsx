import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BackButton } from '@/components/BackButton/BackButton.tsx';
import { Button } from '@/components/Button/Button.tsx';
import { Error } from '@/components/Error/Error.tsx';
import { Message } from '@/components/Message/Message.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/Cities/CitiesContext.ts';
import { useUrlPosition } from '@/hooks/useUrlPosition.ts';
import { reversedGeoSchema } from '@/types/schemas.ts';
import { ReversedGeoType } from '@/types/types.ts';

import styles from './Form.module.css';

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatCountryName(countryName: string) {
  return countryName.replace(/\s+\(the\)$/, '').trim();
}

const formSchema = z.object({
  cityName: z.string().nonempty('City name must be provided'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  notes: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

const positionSchema = z.object({
  lat: z.coerce
    .number()
    .min(0, { message: 'Latitude must be larger than or equal to 0' })
    .max(90, { message: 'Latitude must be less than or equal to 90' }),
  lng: z.coerce
    .number()
    .min(-180, { message: 'Longitude must be larger than or equal to -180' })
    .max(180, { message: 'Longitude must be less than or equal to 180' }),
});

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function Form() {
  const [isLoadingGeoLoading, setIsLoadingGeoLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {},
  );

  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!lat || !lng) return;

      try {
        const result = positionSchema.safeParse({ lat, lng });

        if (!result.success) {
          setGeoCodingError(result.error.issues[0].message);
          return;
        }

        setIsLoadingGeoLoading(true);
        setGeoCodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = (await res.json()) as ReversedGeoType;
        reversedGeoSchema.parse(data);

        if (!data.countryCode) {
          setGeoCodingError(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );
        }

        setCityName(data.city || data.locality || '');
        setEmoji(convertToEmoji(data.countryCode));
        setCountry(formatCountryName(data.countryName));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGeoLoading(false);
      }
    }

    void fetchData();
  }, [lat, lng]);

  if (isLoadingGeoLoading) return <Spinner />;

  if (lat === null || lng === null) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!lat || !lng) return;

    const result = formSchema.safeParse({ cityName, date, notes, lat, lng });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setFormErrors(newErrors);
      return;
    }

    const validatedData = result.data;

    const newCity = {
      cityName,
      emoji,
      date,
      notes,
      position: { lat: validatedData.lat, lng: validatedData.lng },
      country,
    };

    createCity(newCity)
      .then(() => navigate('/app/'))
      .catch((error) => console.error(error));
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
        {formErrors.cityName && <Error message={formErrors.cityName} />}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date ?? new Date())}
          selected={date}
          dateFormat="dd/MM/yyyy"
          popperModifiers={[
            {
              name: 'arrow',
              options: {
                padding: ({ popper }) => ({
                  right: popper.width - 32,
                }),
              },
            },
          ]}
        />
        {formErrors.date && <Error message={formErrors.date} />}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variant="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
