import { HotelRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';

export class HotelService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(HotelRoutes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static details(id: string) {
    return api.get(`${HotelRoutes.DEFAULT}${id}/`).json<IHotel>();
  }
}
