import { Message } from '@/components/Message/Message.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/Cities/CitiesContext.ts';
import { CountryType } from '@/types/types.ts';

import { CountryItem } from './CountryItem.tsx';
import styles from './CountryList.module.css';

export function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const seenCountries = new Set<string>();
  const countries: CountryType[] = [];

  for (const city of cities) {
    if (!seenCountries.has(city.country)) {
      countries.push({ country: city.country, emoji: city.emoji });
      seenCountries.add(city.country);
    }
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
