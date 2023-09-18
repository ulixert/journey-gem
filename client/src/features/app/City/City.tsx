import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '@/components/BackButton/BackButton.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/Cities/CitiesContext.ts';
import { formatDate } from '@/utils/formatDate.ts';

import styles from './City.module.css';

export function City() {
  const { id } = useParams();
  const { getCity, currentCity } = useCities();
  const [hasDisplayCity, setHasDisplayCity] = useState(false);

  useEffect(() => {
    async function fetchCity() {
      try {
        if (id === undefined) return;

        await getCity(id);
        setHasDisplayCity(true);
      } catch (error) {
        console.error(error);
      }
    }

    void fetchCity();
  }, [id, getCity]);

  if (!hasDisplayCity || !currentCity) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}
