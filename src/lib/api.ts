import ky from 'ky';

import { ACCESS_TOKEN_KEY, API_URL } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessToken } from '@/types/IToken';

import { getTokenPair } from './utils';

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': API_URL,
  },
  hooks: {
    beforeRequest: [
      function (request) {
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
      async function (request, _options, response) {
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

          // Update the access token in local storage
          localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);

          // Request the original request again with the new access token
          request.headers.set(
            'Authorization',
            `Bearer ${response.access_token}`,
          );
          return ky(request);
        }
      },
    ],
  },
});

export default api;
