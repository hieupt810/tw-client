import { RestaurantRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction, IAttractionPaging } from '@/types/IAttraction';
import { IRestaurant } from '@/types/IRestaurant';

export class RestaurantService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(RestaurantRoutes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static shortDetails(id: string) {
    return api
      .get(`${RestaurantRoutes.DEFAULT}${id}/short-details`)
      .json<IAttraction>();
  }

  static details(id: string) {
    return api
      .get(`${RestaurantRoutes.DEFAULT}${id}/details`)
      .json<IRestaurant>();
  }

  static delete(id: string) {
    return api.delete(`${RestaurantRoutes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IRestaurant) {
    return api.put(`${RestaurantRoutes.DEFAULT}${id}`, { json: data }).json();
  }
}
