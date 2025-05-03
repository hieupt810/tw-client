import { UserRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IProfile } from '@/types/IProfile';

export class UserService {
  static async getProfile() {
    const response = await api.get(UserRoutes.PROFILE).json<IProfile>();
    return response;
  }
}
