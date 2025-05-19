import { z } from 'zod';

export const hotelEditSchema = z.object({
  name: z.string().min(1, { message: 'Hotel name is required.' }),
  email: z.string().email('Invalid email address.').nullable(),
  phone: z.string().nullable(),
  website: z.string().url('Invalid URL.').nullable(),
  street: z.string().nullable(),
  city: z.object({
    name: z.string(),
    postalCode: z.string(),
  }),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().nullable(),
  features: z.array(z.string()),
  hotelClass: z.string(),
  numberOfRooms: z
    .number()
    .int()
    .min(1, { message: 'Number of rooms must be at least 1.' }),
  priceLevels: z.array(z.string()),
  photos: z.array(z.string()),
  aiReviewsSummary: z.string().nullable(),
});

export type IHotelEditSchema = z.infer<typeof hotelEditSchema>;
