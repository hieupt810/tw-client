export type IHotel = {
  address: {
    street: string;
    city: {
      name: string;
      postalCode: string;
    };
  };
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  photos: string[];
  rating: number;
  rating_histogram: number[];
};
