import { ThingToDoRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';

export class ThingToDoService {
  static getAll() {
    return api.get(ThingToDoRoutes.DEFAULT).json<IAttractionPaging>();
  }
}
