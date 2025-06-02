import { IMe } from './IMe';

export interface IReview {
  created_at: string;
  updated_at: string;
  id: string;
  place_id: string;
  rating: number;
  review: string;
  user: Pick<IMe, 'avatar' | 'full_name'>;
}
