export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const APP_NAME = 'TripWise';
export const APP_DESCRIPTION =
  'Intelligent Destination and Route Recommendations for Journey';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const NAVIGATION_MENU_ITEMS: { label: string; href: string }[] = [
  { label: 'Hotels', href: '/hotels' },
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Things to Do', href: '/things-to-do' },
];
