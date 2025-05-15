import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Constant } from '@/constants';
import { ISavedAttraction } from '@/types/ISavedAttraction';

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

export function removeTokenPair() {
  if (typeof window === 'undefined') return null;
  localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY);
  localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY);
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

export function saveRecentlyViewed(elementId: string, type: string) {
  if (typeof window === 'undefined') return;
  const recentlyViewed = localStorage.getItem(
    Constant.LOCAL_STORAGE_KEY.RECENTLY_VIEWED_KEY,
  );
  const newItem = { elementId, type };
  if (!recentlyViewed) {
    localStorage.setItem(
      Constant.LOCAL_STORAGE_KEY.RECENTLY_VIEWED_KEY,
      JSON.stringify([newItem]),
    );
    return;
  }
  const parsed: ISavedAttraction[] = JSON.parse(recentlyViewed);
  const index = parsed.findIndex(
    (item) => item.elementId === elementId && item.type === type,
  );
  if (index !== -1) {
    parsed.splice(index, 1);
  }
  parsed.unshift(newItem);
  localStorage.setItem(
    Constant.LOCAL_STORAGE_KEY.RECENTLY_VIEWED_KEY,
    JSON.stringify(parsed),
  );
}

export function getRecentlyViewed() {
  if (typeof window === 'undefined') return [];
  const recentlyViewed = localStorage.getItem(
    Constant.LOCAL_STORAGE_KEY.RECENTLY_VIEWED_KEY,
  );
  if (!recentlyViewed) return [];
  const parsed: ISavedAttraction[] = JSON.parse(recentlyViewed);
  return parsed;
}
