import { useReducer } from 'react';

import { UserType } from '@/types/types.ts';

import { AuthContext } from './FakeAuthContext.ts';

type AuthState = {
  user: UserType | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

type AuthAction = { type: 'login'; payload: UserType } | { type: 'logout' };

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: '8fjvcewjfidfh8w9j@@',
  avatar: 'https://i.pravatar.cc/100?u=start',
};

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
