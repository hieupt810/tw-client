export class Constant {
  static API_URL = process.env.NEXT_PUBLIC_API_URL;

  static APP_NAME = 'TripWise';
  static APP_DESCRIPTION =
    'Intelligent Destination and Route Recommendations for Journey';

  static LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    RECENTLY_VIEWED_KEY: 'recentlyViewed',
  };

  static NAVIGATION_MENU_ITEMS: { label: string; href: string }[] = [
    { label: 'Hotels', href: '/hotel' },
    { label: 'Restaurants', href: '/restaurant' },
    { label: 'Things to Do', href: '/thing-to-do' },
  ];

  static REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  };
}
