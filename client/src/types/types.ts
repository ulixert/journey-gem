import { z } from 'zod';

import { citySchema, reversedGeoSchema } from './schemas.ts';

export type CityType = z.infer<typeof citySchema>;
export type ReversedGeoType = z.infer<typeof reversedGeoSchema>;

export type CountryType = {
  country: string;
  emoji: string;
};

export type CityTypeWithoutId = Omit<CityType, 'id'>;

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
