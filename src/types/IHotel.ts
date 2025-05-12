import { IBaseItem } from './IBaseItem';

export type IHotel = {
  address: {
    city: {
      name: string;
      postalCode: string;
    };
    street: string;
  };
  aiReviewsSummary: string;
  amenities: string[];
  description: string;
  email: string;
  hotelClasses: string[];
  latitude: number;
  longitude: number;
  numberOfRooms: number;
  phone?: string;
  photos: string[];
  priceLevels: string[];
  ratingHistogram: number[];
  rawRating: number;
  travelerChoiceAward: boolean;
  website?: string;
} & IBaseItem;
