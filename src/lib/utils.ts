import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenPair() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}
