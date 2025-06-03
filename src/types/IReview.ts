import { IMe } from './IMe';
import { IPagingMeta } from './IPaging';

export interface IReview {
  created_at: string;
  updated_at: string;
  id: string;
  place_id: string;
  rating: number;
  review: string;
  user: Pick<IMe, 'avatar' | 'full_name'>;
}

export enum ReviewSortBy {
  RATING = 'rating',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
export enum ReviewSortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IReviewQuery extends Pick<IPagingMeta, 'page' | 'size'> {
  sortBy: ReviewSortBy;
  sortOrder: ReviewSortOrder;
}
