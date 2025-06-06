import api from '@/lib/api';
import { UpdateProfileSchema } from '@/types/IUpdateProfileSchema';
import { IUser, IUserPaging } from '@/types/IUser';

class Routes {
  static DEFAULT = 'users/';
}

export class UserService {
  static list(page: number = 1, size: number = 10, name: string = '') {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size, name } })
      .json<IUserPaging>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}`).json<IUser>();
  }

  static delete(id: string) {
    return api.delete(`${Routes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: UpdateProfileSchema) {
    return api.patch(`${Routes.DEFAULT}${id}`, { json: data }).json<IUser>();
  }

  static me() {
    return api.get(`${Routes.DEFAULT}me`).json<IUser>();
  }
}
