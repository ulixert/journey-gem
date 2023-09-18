import { Link } from 'react-router-dom';

import { PageNav } from '@/components/PageNav/PageNav.tsx';

import styles from './Home.module.css';

function Home() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Embark on Unforgettable
          <br />
          Journeys with Voyagist.
        </h1>
        <h2>
          Every destination has a story, and every journey crafts a tale. Dive
          deep into curated experiences, connect with fellow travelers, and
          chronicle your adventures with us.
        </h2>

        <Link to="/login" className="cta">
          Start Your Adventure
        </Link>
      </section>
    </main>
  );
}

export default Home;
