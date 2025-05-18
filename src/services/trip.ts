import { TripRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { ITrip } from '@/types/ITrip';

export class TripService {
  static getTrip() {
    return api.get(TripRoutes.DEFAULT).json<ITrip[]>();
  }

  static addPlaceToTrip(tripId: string, placeId: string) {
    return api.post(`${TripRoutes.DEFAULT}${tripId}/places`, {
      json: { place_id: placeId },
    });
  }
}
