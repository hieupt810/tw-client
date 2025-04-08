import ky from 'ky';

import { API_URL } from '@/constants';

import { afterResponseHook, beforeRequestHook } from './utils';

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 1,
    statusCodes: [500],
  },
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
});

export default api;
