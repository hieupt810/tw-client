import { z } from 'zod';

export const updateProfileSchema = z.object({
  avatar: z
    .string()
    .url({ message: 'Avatar must be a valid URL.' })
    .optional()
    .or(z.literal('')),
  full_name: z
    .string()
    .min(1, { message: 'Full name is required.' })
    .max(100, { message: 'Full name must be at most 100 characters long.' })
    .trim(),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  phone_number: z.string().optional(),
  birthday: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format.',
    }),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
