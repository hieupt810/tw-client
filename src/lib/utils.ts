import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenPair() {
  if (typeof window === 'undefined') return null;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  // Check if both tokens are present
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}
