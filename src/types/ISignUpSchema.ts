import { z } from 'zod';

import { Regex } from '@/constants/regex';

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'This field is required.' }),
    email: z
      .string()
      .min(1, { message: 'This field is required.' })
      .email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .max(32, 'Password must be at most 32 characters long.')
      .regex(Regex.PASSWORD, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }),
    confirmPassword: z.string().min(1, { message: 'This field is required.' }),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ISignUpSchema = z.infer<typeof signUpSchema>;
