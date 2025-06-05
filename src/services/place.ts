import api from '@/lib/api';
import { IRestaurantSearch } from '@/types/IRestaurant';

class Routes {
  static DEFAULT = 'places/';
}

export class PlaceService {
  static search(name: string, type: string) {
    return api
      .get(`${Routes.DEFAULT}search`, { searchParams: { name, type } })
      .json<IRestaurantSearch>();
  }
}
