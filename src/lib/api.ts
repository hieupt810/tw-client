import ky from 'ky';

import { Constant } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessToken } from '@/types/IToken';

import { getTokenPair, removeTokenPair } from './utils';

const api = ky.create({
  prefixUrl: Constant.API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': Constant.API_URL,
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
        if (response.status === 401) {
          const tokenPair = getTokenPair();
          if (!tokenPair) {
            removeTokenPair();
            return;
          }

          // Refresh the access token
          try {
            const response = await ky
              .post(Constant.API_URL + AuthRoutes.REFRESH_TOKEN, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${tokenPair.refreshToken}`,
                },
              })
              .json<IAccessToken>();

            // Update the access token in local storage
            localStorage.setItem(
              Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY,
              response.access_token,
            );

            // Request the original request again with the new access token
            request.headers.set(
              'Authorization',
              `Bearer ${response.access_token}`,
            );
            return ky(request);
          } catch {
            removeTokenPair();
            window.location.href = '/sign-in';
          }
        }
      },
    ],
  },
});

export default api;
