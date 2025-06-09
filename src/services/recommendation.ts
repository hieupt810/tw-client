import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';

const Routes = {
  DEFAULT: 'recommendations/',
};

export class RecommendationsService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }
}
