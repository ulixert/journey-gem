import { useCallback, useEffect, useReducer } from 'react';

import { citySchema } from '@/types/schemas.ts';
import { CityType, CityTypeWithoutId } from '@/types/types.ts';

import { CitiesContext } from './CitiesContext.ts';

const BASE_URL = 'http://localhost:8000';

type CitiesState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
};

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: '',
};

type CitiesAction =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: CityType[] }
  | { type: 'city/loaded' | 'city/created'; payload: CityType }
  | { type: 'city/deleted'; payload: number }
  | { type: 'rejected'; payload: string };

function reducer(state: CitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

export function CitiesProvider({ children }: React.PropsWithChildren) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as CityType[];

        dispatch({
          type: 'cities/loaded',
          payload: citySchema.array().parse(data),
        });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }

    void fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === String(currentCity?.id)) return;

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const city = (await res.json()) as CityType;
        dispatch({ type: 'city/loaded', payload: citySchema.parse(city) });
      } catch (error) {
        alert('There was an error getting city');
      }
    },
    [currentCity?.id],
  );

  async function createCity(newCity: CityTypeWithoutId) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await res.json()) as CityType;
      dispatch({
        type: 'city/created',
        payload: citySchema.parse(data),
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city...',
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: 'loading' });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
