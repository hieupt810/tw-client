import { z } from 'zod';

export const chatMessageSchema = z.object({
  text: z.string().min(1),
});

export type IChatMessageSchema = z.infer<typeof chatMessageSchema>;
