import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';
import { toast } from 'sonner';

import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { IAccessToken } from '@/types/IAccessToken';

export function getTokens() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!accessToken || !refreshToken) {
    return null;
  }
  return { accessToken, refreshToken };
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function refreshAccessToken() {
  const tokens = getTokens() || null;
  if (!tokens) {
    throw new Error('No tokens found.');
  }

  // Make a request to refresh the access token using the refresh token
  const response = await ky
    .post(API_URL + AuthRoutes.REFRESH_TOKEN, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    })
    .json<IAccessToken>();
  if (!response) {
    throw new Error('Failed to refresh access token.');
  }

  // Store the new access token in local storage
  localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);
  return response.data.access_token;
}

export function beforeRequestHook(request: KyRequest) {
  const tokens = getTokens();
  if (tokens) {
    request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }
}

export async function afterResponseHook(
  request: KyRequest,
  _opt: NormalizedOptions,
  response: KyResponse,
) {
  const tokens = getTokens();
  if (response.status === 401 && tokens) {
    try {
      const newAccessToken = await refreshAccessToken();
      request.headers.set('Authorization', `Bearer ${newAccessToken}`);
      return ky(request);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      clearTokens();
      toast.info('Session expired. Please log in again.');
      window.location.href = '/sign-in';
    }
  }
  return response;
}
