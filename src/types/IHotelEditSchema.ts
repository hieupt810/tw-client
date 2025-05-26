import { z } from 'zod';

export const hotelEditSchema = z.object({
  name: z.string().min(1, { message: 'Hotel name is required.' }),
  email: z.string().email('Invalid email address.').nullable(),
  phone: z.string().nullable(),
  website: z.string().url('Invalid URL.').nullable(),
  street: z.string().nullable(),
  city: z.object({
    name: z.string(),
    postal_code: z.string(),
  }),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().nullable(),
  features: z.array(z.string()),
  hotel_class: z.string(),
  number_of_rooms: z
    .number()
    .int()
    .min(1, { message: 'Number of rooms must be at least 1.' }),
  price_levels: z.array(z.string()),
  photos: z.array(z.string()),
  ai_reviews_summary: z.string().nullable(),
});

export type IHotelEditSchema = z.infer<typeof hotelEditSchema>;
