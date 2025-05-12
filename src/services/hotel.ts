import { HotelRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IHotel } from '@/types/IHotel';

export class HotelService {
  static getAll() {
    return api.get(HotelRoutes.DEFAULT).json<IHotel[]>();
  }

  static getById(id: string) {
    return api.get(`${HotelRoutes.DEFAULT}/${id}`).json<IHotel>();
  }
}
