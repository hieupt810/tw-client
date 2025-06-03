import api from '@/lib/api';
import { IPaging } from '@/types/IPaging';
import { IReview, IReviewQuery } from '@/types/IReview';

class Routes {
  static DEFAULT = 'reviews/';
}

export class ReviewService {
  static list(placeId: string, query: IReviewQuery) {
    return api
      .get(`${Routes.DEFAULT}${placeId}`, {
        searchParams: {
          page: query.page,
          size: query.size,
          sort_by: query.sortBy,
          order: query.sortOrder,
        },
      })
      .json<IPaging<IReview>>();
  }

  static create(placeId: string, review: Pick<IReview, 'rating' | 'review'>) {
    return api
      .post(`${Routes.DEFAULT}${placeId}`, { json: review })
      .json<IReview>();
  }

  static update(placeId: string, review: Pick<IReview, 'rating' | 'review'>) {
    return api
      .patch(`${Routes.DEFAULT}${placeId}`, { json: review })
      .json<IReview>();
  }

  static delete(placeId: string) {
    return api.delete(`${Routes.DEFAULT}${placeId}`).json<IReview>();
  }

  static me(placeId: string) {
    return api
      .get(`${Routes.DEFAULT}my-review/${placeId}`)
      .json<IReview | null>();
  }
}
