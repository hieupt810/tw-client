import { HotelRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IHotel } from '@/types/IHotel';
import { IPagination } from '@/types/IPagination';

export class HotelService {
  static getAll() {
    return api.get(HotelRoutes.DEFAULT).json<IPagination<IHotel>>();
  }

  static getById(id: string) {
    return api.get(`${HotelRoutes.DEFAULT}/${id}`).json<IHotel>();
  }
}
