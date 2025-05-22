import { TripRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { ITrip } from '@/types/ITrip';
import { ITripDetails } from '@/types/ITripDetails';
import { ITripOptimize } from '@/types/ITripOptimize';

export class TripService {
  static getTrip() {
    return api.get(TripRoutes.DEFAULT).json<ITrip[]>();
  }

  static getTripById(tripId: string) {
    return api.get(`${TripRoutes.DEFAULT}${tripId}`).json<ITripDetails>();
  }

  static addPlaceToTrip(tripId: string, placeId: string) {
    return api.post(`${TripRoutes.DEFAULT}${tripId}/places`, {
      json: { place_id: placeId },
    });
  }

  static optimizeTrip(tripId: string) {
    return api
      .post(`${TripRoutes.DEFAULT}${tripId}/optimize`)
      .json<ITripOptimize>();
  }
}
