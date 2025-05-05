import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { IChartData } from '@/types/IChartData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenPair() {
  if (typeof window === 'undefined') return null;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export function formatDate(isodate: string) {
  const date = new Date(isodate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function createChartData(histogram: number[]) {
  if (histogram.length !== 5) {
    throw new Error('Invalid rating histogram data');
  }

  const chartData: IChartData[] = [
    {
      rating: 'Excellent',
      number: histogram[4],
      fill: 'var(--color-chart-1)',
    },
    {
      rating: 'Good',
      number: histogram[3],
      fill: 'var(--color-chart-2)',
    },
    {
      rating: 'Average',
      number: histogram[2],
      fill: 'var(--color-chart-3)',
    },
    {
      rating: 'Poor',
      number: histogram[1],
      fill: 'var(--color-chart-4)',
    },
    {
      rating: 'Terrible',
      number: histogram[0],
      fill: 'var(--color-chart-5)',
    },
  ];

  return chartData;
}
