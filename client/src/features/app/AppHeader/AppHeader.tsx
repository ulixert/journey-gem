import { Logo } from '@/components/Logo/Logo.tsx';

import { User } from '../../Auth/User/User.tsx';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <div className={styles.header}>
      <Logo />
      <User />
    </div>
  );
}
