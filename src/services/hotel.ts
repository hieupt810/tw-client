import api from '@/lib/api';
import { IAttraction, IAttractionPaging } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';

class Routes {
  static DEFAULT = 'hotels/';
}

export class HotelService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static shortDetails(id: string) {
    return api.get(`${Routes.DEFAULT}${id}/short-details`).json<IAttraction>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}/details`).json<IHotel>();
  }

  static delete(id: string) {
    return api.delete(`${Routes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IHotel) {
    return api.put(`${Routes.DEFAULT}${id}`, { json: data }).json();
  }
}
