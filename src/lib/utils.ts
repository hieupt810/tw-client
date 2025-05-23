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

export async function* streamResponse(message: string) {
  const response = await fetch(`${Constant.API_URL}conversations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      yield decoder.decode(value, { stream: !done });
    }
  }
}
