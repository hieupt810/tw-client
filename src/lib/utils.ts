import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Constant } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenPair() {
  if (typeof window === 'undefined') return null;
  const accessToken = localStorage.getItem(
    Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY,
  );
  const refreshToken = localStorage.getItem(
    Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY,
  );
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export function formatDate(isodate: string) {
  const date = new Date(isodate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
