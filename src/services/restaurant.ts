import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IRestaurant } from '@/types/IRestaurant';

class Routes {
  static DEFAULT = 'restaurants/';
}

export class RestaurantService {
  static list(
    page: number = 1,
    size: number = 10,
    filters: Record<string, string>,
  ) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size, ...filters } })
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

  static cuisines() {
    return api.get(`${Routes.DEFAULT}cuisines/`).json<{ cuisines: string[] }>();
  }

  static mealTypes() {
    return api
      .get(`${Routes.DEFAULT}meal-types/`)
      .json<{ meal_types: string[] }>();
  }

  static features() {
    return api.get(`${Routes.DEFAULT}features/`).json<{ features: string[] }>();
  }

  static dietaryRestrictions() {
    return api
      .get(`${Routes.DEFAULT}dietary-restrictions/`)
      .json<{ dietary_restrictions: string[] }>();
  }

  static dishes() {
    return api.get(`${Routes.DEFAULT}dishes/`).json<{ dishes: string[] }>();
  }
}
