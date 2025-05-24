import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IRestaurant } from '@/types/IRestaurant';

class Routes {
  static DEFAULT = 'restaurants/';
}

export class RestaurantService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}/`).json<IRestaurant>();
  }

  static delete(id: string) {
    return api.delete(`${Routes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IRestaurant) {
    return api.put(`${Routes.DEFAULT}${id}`, { json: data }).json();
  }
}
