import api from '@/lib/api';
import { IHotel } from '@/types/IHotel';
import { IRestaurant } from '@/types/IRestaurant';

const Route = {
  DEFAULT: 'places/',
};

export class PlaceService {
  static async searchPlaces(
    name: string,
    type?: 'restaurant' | 'hotel' | 'thingtodo',
    limit: number = 5,
  ) {
    return api
      .get(`${Route.DEFAULT}search`, {
        searchParams: { name, ...(type && { type }), limit },
      })
      .json<{ data: Array<IRestaurant | IHotel>; total: number }>()
      .then((res) => {
        const { data } = res;
        return data || [];
      });
  }
}
