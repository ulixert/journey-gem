import { Message } from '@/components/Message/Message.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/Cities/CitiesContext.ts';

import { CityItem } from './CityItem.tsx';
import styles from './CityList.module.css';

export function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.toReversed().map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
