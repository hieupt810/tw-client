import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Constant } from '@/constants';
import { AuthService } from '@/services/auth';
import { IMe } from '@/types/IMe';

type State = {
  me: IMe | null;
  isLoadingMe: boolean;
  isAuthenticated: boolean;
};

type Action = {
  signInAction: () => void;
  logOutAction: () => void;
  meAction: () => Promise<void>;
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set, get) => ({
      me: null,
      isLoadingMe: true,
      isAuthenticated: false,

      signInAction() {
        set((state) => ({ ...state, isAuthenticated: true }));
      },

      logOutAction() {
        set((state) => ({ ...state, isAuthenticated: false, me: null }));
      },

      async meAction() {
        try {
          if (!get().isAuthenticated) return;
          set((state) => ({ ...state, isLoadingMe: true }));
          const resp = await AuthService.me();
          set((state) => ({ ...state, me: resp }));
        } catch {
          localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY);
          localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY);
        } finally {
          set((state) => ({ ...state, isLoadingMe: false }));
        }
      },
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
