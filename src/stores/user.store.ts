import { create } from 'zustand';

import { UserService } from '@/services/user';
import { IPagingMeta } from '@/types/IPaging';
import { IUser } from '@/types/IUser';

import { UpdateProfileSchema } from './../types/IUpdateProfileSchema';

type State = {
  user: {
    item: IUser | null;
    error: string;
    isLoading: boolean;
    isSuccess?: boolean;
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
  fetchDeleteUser: (id: string) => Promise<void>;
  fetchEditUser: (id: string, data: UpdateProfileSchema) => Promise<void>;
  fetchMe: () => Promise<void>;
};

const initialState: State = {
  user: {
    item: null,
    error: '',
    isLoading: true,
    isSuccess: false,
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

  async fetchDeleteUser(id) {
    set((state) => ({
      users: { ...state.users, isLoading: true },
    }));
    try {
      await UserService.delete(id);
      set((state) => ({
        users: {
          ...state.users,
          items: state.users.items.filter((user) => user.id !== id),
        },
      }));
    } catch {
      set((state) => ({
        users: {
          ...state.users,
          error: 'Failed to delete user',
        },
      }));
    } finally {
      set((state) => ({
        users: { ...state.users, isLoading: false },
      }));
    }
  },

  async fetchEditUser(id, data: UpdateProfileSchema) {
    set((state) => ({ users: { ...state.users } }));
    try {
      const updatedUser = await UserService.edit(id, data);
      set((state) => ({
        user: { ...state.user, item: updatedUser, isSuccess: true, error: '' },
      }));
    } catch {
      set((state) => ({
        user: {
          ...state.user,
          error: 'Failed to update user',
          isSuccess: false,
        },
      }));
    } finally {
      set((state) => ({
        user: { ...state.user, isLoading: false },
      }));
    }
  },

  async fetchMe() {
    set((state) => ({
      user: { ...state.user, isLoading: true },
    }));
    try {
      const data = await UserService.me();
      set((state) => ({
        user: { ...state.user, item: data },
      }));
    } catch {
      set((state) => ({
        user: {
          ...state.user,
          error: 'Failed to fetch user',
        },
      }));
    } finally {
      set((state) => ({
        user: { ...state.user, isLoading: false },
      }));
    }
  },
}));
