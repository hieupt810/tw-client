import { IAttraction } from './IAttraction';

export interface IHotel extends IAttraction {
  aiReviewsSummary: string;
  description: string;
  features: string[];
  hotelClass: string;
  numberOfRooms: number;
  priceLevels: string[];
}
