export class Constant {
  static API_URL = process.env.NEXT_PUBLIC_API_URL;

  static APP_NAME = 'TripWise';
  static APP_DESCRIPTION =
    'Intelligent Destination and Route Recommendations for Journey';

  static LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
  };

  static NAVIGATION_MENU_ITEMS: { label: string; href: string }[] = [
    { label: 'Hotels', href: '/hotel' },
    { label: 'Restaurants', href: '/restaurant' },
    { label: 'Things to Do', href: '/thing-to-do' },
  ];

  static REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  };

  static MARKER_ICON_URL = {
    SHADOW:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    VIOLET:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    GREEN:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    RED: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  };
}
