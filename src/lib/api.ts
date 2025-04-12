import ky from 'ky';

import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessToken } from '@/types/IAccessToken';

import { getTokenPair } from './utils';

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const tokenPair = getTokenPair();
        if (tokenPair) {
          request.headers.set(
            'Authorization',
            `Bearer ${tokenPair.accessToken}`,
          );
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        const tokenPair = getTokenPair();

        // Handle 401 Unauthorized
        if (tokenPair && response.status === 401) {
          const response = await ky
            .post(API_URL + AuthRoutes.REFRESH_TOKEN, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenPair.refreshToken}`,
              },
            })
            .json<IAccessToken>();
          if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);

            // Request the original request again with the new access token
            request.headers.set(
              'Authorization',
              `Bearer ${response.data.accessToken}`,
            );
            return ky(request);
          }
        } else {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      },
    ],
  },
});

export default api;
