import { HTTPError } from 'ky';
import { create } from 'zustand';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { getTokenPair } from '@/lib/utils';
import { getMe, postSignIn } from '@/services/auth';
import { IError } from '@/types/IError';
import { IMe } from '@/types/IMe';
import { ISignInSchema } from '@/types/ISignInSchema';

type IAuthStore = {
  error:
    | string
    | {
        [key: string]: string[];
      };
  user: IMe | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  me: () => Promise<void>;
  signIn: (values: ISignInSchema) => Promise<void>;
  logOut: () => void;
};

export const useAuthStore = create<IAuthStore>()((set) => ({
  error: '',
  user: null,
  isLoading: true,
  isAuthenticated: false,

  // Actions
  async me() {
    set((state) => ({ ...state, isLoading: true }));
    try {
      if (getTokenPair() === null) {
        set((state) => ({ ...state, user: null, isAuthenticated: false }));
        return;
      }

      // Fetch data
      const response = await getMe();
      set((state) => ({ ...state, user: response, isAuthenticated: true }));
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = await error.response.json<IError>();
        set((state) => ({
          ...state,
          user: null,
          error: response.error,
          isAuthenticated: false,
        }));
      } else {
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
          error: 'Something went wrong. Please try again later.',
        }));
      }
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  async signIn(values) {
    set((state) => ({ ...state, isLoading: true, error: '' }));
    try {
      const response = await postSignIn(values);

      // Save tokens in local storage
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token);

      // Set state
      set((state) => ({ ...state, isAuthenticated: true }));
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        set((state) => ({
          ...state,
          error: data.error,
          isAuthenticated: false,
        }));
      } else {
        set((state) => ({
          ...state,
          error: 'Something went wrong. Please try again later.',
          isAuthenticated: false,
        }));
      }
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  logOut() {
    set((state) => ({ ...state, isLoading: true }));
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set((state) => ({
      ...state,
      user: null,
      isLoading: false,
      isAuthenticated: false,
    }));
  },
}));
