import { IPaging } from './IPaging';

export interface Statistics {
  average_rating_given: number;
  favorites_count: number;
  reviews_count: number;
  trips_count: number;
}
export interface IUser {
  avatar: string;
  birthday: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  is_admin: boolean;
  is_verified: boolean;
  phone_number: string;
  updated_at: string;
  statistics?: Statistics;
}

export type IUserPaging = IPaging<IUser>;
