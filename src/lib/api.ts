import ky from 'ky';

import { ACCESS_TOKEN_KEY, API_URL } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessTokenResponse } from '@/types/IToken';

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
            .json<IAccessTokenResponse>();
          if (response.success) {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);

            // Request the original request again with the new access token
            request.headers.set(
              'Authorization',
              `Bearer ${response.data.access_token}`,
            );
            return ky(request);
          }
        } else {
        }
      },
    ],
  },
});

export default api;
