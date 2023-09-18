import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/FakeAuth/FakeAuthContext.ts';

import styles from './User.module.css';

export function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  function handleClick() {
    logout();
    navigate('/');
  }

  if (!user) return;

  return (
    <div
      className={`${styles.user} ${
        showLogout ? styles['user--showLogout'] : ''
      }`}
      onMouseEnter={() => setShowLogout(true)}
      onMouseLeave={() => setShowLogout(false)}
    >
      {showLogout ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <img src={user.avatar} alt={user.name} />
      )}
    </div>
  );
}
