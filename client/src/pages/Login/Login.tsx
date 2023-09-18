import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button.tsx';
import { useAuth } from '@/contexts/FakeAuth/FakeAuthContext.ts';

import { PageNav } from '../../components/PageNav/PageNav.tsx';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('8fjvcewjfidfh8w9j@@');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate replace to="/app/cities" />;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button variant="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
