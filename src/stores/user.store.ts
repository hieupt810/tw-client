import { create } from 'zustand';

import { UserService } from '@/services/user';
import { IPagingMeta } from '@/types/IPaging';
import { IUser } from '@/types/IUser';

type State = {
  user: {
    item: IUser | null;
    error: string;
    isLoading: boolean;
  };
  users: {
    items: IUser[];
    error: string;
    isLoading: boolean;
    paging: IPagingMeta;
  };
};

type Action = {
  reset: () => void;
  fetchUser: (id: string) => Promise<void>;
  fetchUsers: (page: number, size: number, name: string) => Promise<void>;
};

const initialState: State = {
  user: {
    item: null,
    error: '',
    isLoading: true,
  },
  users: {
    items: [],
    error: '',
    isLoading: true,
    paging: {
      offset: 0,
      page: 1,
      pageCount: 0,
      size: 5,
      totalCount: 0,
    },
  },
};

export const useUserStore = create<State & Action>()((set) => ({
  ...initialState,
  reset() {
    set(() => ({ ...initialState }));
  },

  async fetchUser(id) {
    set((state) => ({
      user: { ...state.user, isLoading: true },
    }));
    try {
      const data = await UserService.details(id);
      set((state) => ({
        user: { ...state.user, item: data },
      }));
    } catch {
      set((state) => ({
        user: {
          ...state.user,
          error: 'Failed to fetch hotel',
        },
      }));
    } finally {
      set((state) => ({
        user: { ...state.user, isLoading: false },
      }));
    }
  },

  async fetchUsers(page, size, name) {
    set((state) => ({
      users: { ...state.users, isLoading: true },
    }));
    try {
      console.log('Fetching users', { page, size, name });
      const data = await UserService.list(page, size, name);
      set((state) => ({
        users: { ...state.users, items: data.data, paging: data.paging },
      }));
    } catch {
      set((state) => ({
        users: {
          ...state.users,
          error: 'Failed to fetch users',
        },
      }));
    } finally {
      set((state) => ({
        users: { ...state.users, isLoading: false },
      }));
    }
  },
}));
