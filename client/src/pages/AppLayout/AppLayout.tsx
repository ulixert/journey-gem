import { SideBar } from '@/features/app/SideBar/SideBar.tsx';
import { Map } from '@/features/map/Map.tsx';

import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
