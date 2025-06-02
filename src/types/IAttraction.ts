import { IPaging } from './IPaging';

export interface IAttraction {
  city: {
    name: string;
    postal_code: string;
  };
  created_at: string;
  element_id: string;
  email: string | null;
  image: string;
  is_favorite: boolean;
  latitude: number;
  longitude: number;
  name: string;
  price_levels: string[];
  price_range: string | null;
  rating: number;
  rating_histogram: number[];
  street: string | null;
  type: 'HOTEL' | 'RESTAURANT' | 'THING-TO-DO';
}

export type IAttractionPaging = IPaging<IAttraction>;
