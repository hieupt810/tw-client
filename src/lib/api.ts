import ky from 'ky';

import { Constant } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessToken } from '@/types/IToken';

import { getTokenPair } from './utils';

const api = ky.create({
  prefixUrl: Constant.API_URL,
  timeout: 10000,
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
            localStorage.removeItem(
              Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY,
            );
            localStorage.removeItem(
              Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY,
            );
            window.location.href = '/sign-in';
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
              response.accessToken,
            );

            // Request the original request again with the new access token
            request.headers.set(
              'Authorization',
              `Bearer ${response.accessToken}`,
            );
            return ky(request);
          } catch {
            localStorage.removeItem(
              Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY,
            );
            localStorage.removeItem(
              Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY,
            );
            window.location.href = '/sign-in';
          }
        }
      },
    ],
  },
});

export default api;
