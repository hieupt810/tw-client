import api from '@/lib/api';
import { IReview } from '@/types/IReview';

class Routes {
  static DEFAULT = 'reviews/';
}

export class ReviewService {
  static list(id: string) {
    return api.get(`${Routes.DEFAULT}${id}`).json<IReview[]>();
  }
}
