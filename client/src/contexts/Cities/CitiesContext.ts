import { createContext, useContext } from 'react';

import { CityType, CityTypeWithoutId } from '@/types/types.ts';

type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
  getCity: (id: string) => Promise<void>;
  currentCity: CityType | null;
  createCity: (newCity: CityTypeWithoutId) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
  error: string;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);

export function useCities() {
  const citiesContext = useContext(CitiesContext);

  if (!citiesContext) {
    throw new Error('useCities has to be used within <CitiesContext.Provider>');
  }

  return citiesContext;
}
