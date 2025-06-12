import { IPaging } from './IPaging';

export interface ISummary {
  average_places_per_trip: string;
  total_trips: number;
  total_optimized_trips: number;
  total_users: number;
}

export interface IUserRegister {
  total_user?: number;
  [month: string]: number | undefined;
}
export interface City {
  created_at: string;
  name: string;
  postal_code: string;
}

export interface Place {
  city: City;
  description: string;
  element_id: string;
  email: string;
  image: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  rating: number;
  rating_histogram: number[];
  raw_ranking: number;
  street: string;
  trip_count: number;
  type: string;
  website: string;
  review_number?: number;
}

export type IPlaceDashboardPaging = IPaging<Place>;
