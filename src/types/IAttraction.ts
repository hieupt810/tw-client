import { IPaging } from './IPaging';

export interface IAttraction {
  city: {
    name: string;
    postalCode: string;
  };
  createdAt: string;
  elementId: string;
  email: string | null;
  image: string;
  isFavorite: boolean;
  latitude: number;
  longitude: number;
  name: string;
  priceLevels: string[];
  rating: number;
  ratingHistogram: number[];
  street: string | null;
  type: 'HOTEL' | 'RESTAURANT' | 'THING-TO-DO';
}

export type IAttractionPaging = IPaging<IAttraction>;
