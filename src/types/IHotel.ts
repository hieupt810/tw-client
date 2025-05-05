export type IHotel = {
  name: string;
  address: {
    street: string;
    city: {
      name: string;
      postalCode: string;
    };
  };
  description: string;
  longitude: number;
  latitude: number;
  rating: number;
  rating_histogram: number[];
};
