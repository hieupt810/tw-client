import { RestaurantRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction, IAttractionPaging } from '@/types/IAttraction';

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
    return api.get(`${RestaurantRoutes.DEFAULT}${id}/details`).json();
  }
}
