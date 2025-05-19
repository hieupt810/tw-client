import { IAttraction } from './IAttraction';

export interface IHotel extends IAttraction {
  phone: string | null;
  photos: string[];
  website: string | null;

  aiReviewsSummary: string;
  description: string;
  features: string[];
  hotelClass: string;
  numberOfRooms: number;
  priceLevels: string[];
}
