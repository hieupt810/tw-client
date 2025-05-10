export class Constant {
  static API_URL = process.env.NEXT_PUBLIC_API_URL;

  static APP_NAME = 'TripWise';
  static APP_DESCRIPTION =
    'Intelligent Destination and Route Recommendations for Journey';

  static LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN_KEY: 'access_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
  };

  static NAVIGATION_MENU_ITEMS: { label: string; href: string }[] = [
    { label: 'Hotels', href: '/hotels' },
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'Things to Do', href: '/things-to-do' },
  ];

  static REGEX = {
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
}
