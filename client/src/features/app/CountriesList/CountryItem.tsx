import { CountryType } from '@/types/types.ts';

import styles from './CountryItem.module.css';

type CountryItemProps = {
  country: CountryType;
};

export function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}
