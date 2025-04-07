import { Regex } from '@/constants/regex';
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password must be at most 32 characters long.')
    .regex(Regex.PASSWORD, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});

export type ISignInSchema = z.infer<typeof signInSchema>;
