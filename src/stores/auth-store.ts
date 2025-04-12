import { create } from 'zustand';

import { getTokenPair } from '@/lib/utils';
import { getMe, postSignIn } from '@/services/auth';
import { IShortUser } from '@/types/IMe';
import { ISignInSchema } from '@/types/ISignInSchema';

type IAuthStore = {
  error: string | null;
  user: IShortUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  me: () => Promise<void>;
  signIn: (values: ISignInSchema) => Promise<void>;
};

export const useAuthStore = create<IAuthStore>()((set) => ({
  error: null,
  user: null,
  isLoading: false,
  isAuthenticated: false,

  // Actions
  async me() {
    if (getTokenPair() === null) return;

    // Check if the user is already authenticated
    set((state) => ({ ...state, isLoading: true }));
    const payload = await getMe();
    if (payload.status === 200) {
      set((state) => ({
        ...state,
        isLoading: false,
        user: payload.data,
        isAuthenticated: true,
      }));
    } else {
      set((state) => ({
        ...state,
        error: payload.message,
        isLoading: false,
        user: null,
        isAuthenticated: false,
      }));
    }
  },

  async signIn(values) {
    set((state) => ({ ...state, isLoading: true }));
    const payload = await postSignIn(values);
    if (payload.status === 200) {
      set((state) => ({
        ...state,
        isLoading: false,
        isAuthenticated: true,
      }));
    } else {
      set((state) => ({
        ...state,
        error: payload.message,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  },
}));
