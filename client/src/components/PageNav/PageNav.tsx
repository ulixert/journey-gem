import { NavLink } from 'react-router-dom';

import { Logo } from '../Logo/Logo.tsx';
import styles from './PageNav.module.css';

export function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/login">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
