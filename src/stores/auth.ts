import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { AuthService } from '@/services/auth';
import { IMe } from '@/types/IMe';

type State = {
  me: IMe | null;
  isLoadingMe: boolean;
  isAuthenticated: boolean;
};

type Action = {
  getMe: () => Promise<void>;
  signIn: () => void;
  logOut: () => void;
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set, get) => ({
      me: null,
      isLoadingMe: true,
      isAuthenticated: false,

      getMe: async () => {
        try {
          if (!get().isAuthenticated) return;
          set((state) => ({ ...state, isLoadingMe: true }));
          const resp = await AuthService.me();
          set((state) => ({ ...state, me: resp }));
        } catch {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        } finally {
          set((state) => ({ ...state, isLoadingMe: false }));
        }
      },

      signIn: () => set((state) => ({ ...state, isAuthenticated: true })),

      logOut: () =>
        set((state) => ({ ...state, isAuthenticated: false, me: null })),
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        me: state.me,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
