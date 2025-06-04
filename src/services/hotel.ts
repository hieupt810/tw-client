import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';

class Routes {
  static DEFAULT = 'hotels/';
  static PLACE = 'places/';
}

export class HotelService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}/`).json<IHotel>();
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
}
