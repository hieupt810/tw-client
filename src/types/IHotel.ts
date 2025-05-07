export type IHotel = {
  amenities: string[];
  photos: string[];
  description: string;
  ratingHistogram: number[];
  image: string;
  rating: number;
  email: string;
  numberOfReviews: number;
  hotelClass: string;
  priceRange: string;
  priceLevel: string;
  address: {
    street: string;
    city: {
      name: string;
      postalCode: string;
    };
  };
  travelerChoiceAward: boolean;
  website: string | null;
  rawRanking: number;
  numberOfRooms: number;
  longitude: number;
  latitude: number;
  name: string;
  phone: string | null;
};
