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
  image: string;
  latitude: number;
  longitude: number;
  name: string;
  numberOfRooms: number;
  phone?: string;
  photos: string[];
  priceLevels: string[];
  rating: number;
  ratingHistogram: number[];
  rawRating: number;
  travelerChoiceAward: boolean;
  website?: string;
};
