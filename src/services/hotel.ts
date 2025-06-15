import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';

class Routes {
  static DEFAULT = 'hotels/';
  static PLACE = 'places/';
}

export class HotelService {
  static list(
    page: number = 1,
    size: number = 10,
    search: string,
    hotelClass?: string,
    rating?: number,
    priceRange?: number,
    features?: string,
  ) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const searchParams: any = { page, size, search };
    if (hotelClass) searchParams.hotel_class = hotelClass;
    if (rating) searchParams.rating = rating;
    if (priceRange) searchParams.price = priceRange;
    if (features) searchParams.features = features;
    return api.get(Routes.DEFAULT, { searchParams }).json<IAttractionPaging>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}`).json<IHotel>();
  }

  static delete(id: string) {
    return api.delete(`${Routes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IHotel) {
    return api.put(`${Routes.DEFAULT}${id}`, { json: data }).json();
  }

  static search(name: string) {
    const type = 'hotel';
    return api
      .get(`${Routes.PLACE}search`, { searchParams: { name, type } })
      .json<IAttractionPaging>();
  }

  static feature() {
    return api.get(`${Routes.DEFAULT}features/`).json<{ features: string[] }>();
  }
}
