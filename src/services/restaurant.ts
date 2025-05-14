import { RestaurantRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';

export class RestaurantService {
  static list() {
    return api.get(RestaurantRoutes.DEFAULT).json<IAttractionPaging>();
  }
}
