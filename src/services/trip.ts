import { TripRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction } from '@/types/IAttraction';
import { ITrip } from '@/types/ITrip';

export class TripService {
  static getTrip() {
    return api.get(TripRoutes.DEFAULT).json<ITrip[]>();
  }

  static getTripById(tripId: string) {
    return api.get(`${TripRoutes.DEFAULT}${tripId}`).json<IAttraction[]>();
  }

  static addPlaceToTrip(tripId: string, placeId: string) {
    return api.post(`${TripRoutes.DEFAULT}${tripId}/places`, {
      json: { place_id: placeId },
    });
  }
}
