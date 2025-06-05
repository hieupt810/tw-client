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
  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{0,10}$/.test(val), {
      message: 'Phone number must be up to 10 digits.',
    }),
  birthday: z
    .string()
    .nullable()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format.',
    })
    .refine(
      (val) => {
        if (!val) return true;
        const birthDate = new Date(val);
        const today = new Date('2025-06-05');
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDay() - birthDate.getDay();
        return (
          age > 18 ||
          (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
        );
      },
      { message: 'You must be at least 18 years old.' },
    ),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
