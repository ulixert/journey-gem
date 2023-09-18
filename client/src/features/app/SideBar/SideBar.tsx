import { Outlet } from 'react-router-dom';

import { AppHeader } from '../AppHeader/AppHeader.tsx';
import { AppNav } from '../AppNav/AppNav.tsx';
import { Footer } from '../Footer/Footer.tsx';
import styles from './Sidebar.module.css';

export function SideBar() {
  return (
    <div className={styles.sidebar}>
      <AppHeader />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
