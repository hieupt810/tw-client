import { HotelRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction, IAttractionPaging } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';

export class HotelService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(HotelRoutes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static shortDetails(id: string) {
    return api
      .get(`${HotelRoutes.DEFAULT}${id}/short-details`)
      .json<IAttraction>();
  }

  static details(id: string) {
    return api.get(`${HotelRoutes.DEFAULT}${id}/details`).json<IHotel>();
  }

  static delete(id: string) {
    return api.delete(`${HotelRoutes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IHotel) {
    return api.put(`${HotelRoutes.DEFAULT}${id}`, { json: data }).json();
  }
}
