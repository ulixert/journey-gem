import { Link } from 'react-router-dom';

import { useCities } from '@/contexts/Cities/CitiesContext.ts';
import { CityType } from '@/types/types.ts';
import { formatDate } from '@/utils/formatDate.ts';

import styles from './CityItem.module.css';

type CityItemProps = {
  city: CityType;
};

export function CityItem({ city }: CityItemProps) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, deleteCity } = useCities();

  function handleDeleteCity(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    void deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
