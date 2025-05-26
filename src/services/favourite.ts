import { FavouriteRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction } from '@/types/IAttraction';

export class FavouriteService {
  static list() {
    return api.get(FavouriteRoutes.DEFAULT).json<IAttraction[]>();
  }

  static add(placeId: string) {
    return api
      .post(FavouriteRoutes.DEFAULT, { json: { place_id: placeId } })
      .json();
  }

  static remove(placeId: string) {
    return api.delete(`${FavouriteRoutes.DEFAULT}${placeId}`).json();
  }
}
