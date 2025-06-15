import { IAttraction } from './IAttraction';

export interface IHotel extends IAttraction {
  phone: string | null;
  photos: string[];
  website: string | null;

  ai_reviews_summary: string;
  description: string;
  features: string[];
  hotel_class: string;
  number_of_rooms: number;
}

export interface IFilterStateHotel {
  price?: number;
  starRating?: string;
  amenities?: string[];
  location?: string[];
  sortBy?: string;
  minRating?: number;
  features?: string[];
}
