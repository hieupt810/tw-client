import { FavouriteRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction } from '@/types/IAttraction';

export class FavouriteService {
  static list() {
    return api.get(FavouriteRoutes.DEFAULT).json<IAttraction[]>();
  }
}
