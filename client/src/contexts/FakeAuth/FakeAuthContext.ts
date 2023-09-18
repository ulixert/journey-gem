import { createContext, useContext } from 'react';

import { UserType } from '@/types/types.ts';

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth has to be used within <AuthContext.Provider>');
  }

  return authContext;
}
