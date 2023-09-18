import { z } from 'zod';

export const citySchema = z.object({
  id: z.number(),
  cityName: z.string(),
  country: z.string(),
  emoji: z.string(),
  date: z.coerce.date(),
  notes: z.string(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const reversedGeoSchema = z.object({
  city: z.string(),
  countryCode: z.string(),
  locality: z.string(),
  countryName: z.string(),
});
