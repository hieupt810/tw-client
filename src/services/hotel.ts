import api from '@/lib/api';

export class HotelService {
  static getById(id: string) {
    return api.get(`/hotels/${id}`);
  }
}
