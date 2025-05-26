import api from '@/lib/api';
import { IAttraction } from '@/types/IAttraction';
import { ITrip } from '@/types/ITrip';
import { ITripDetails } from '@/types/ITripDetails';
import { ITripOptimize } from '@/types/ITripOptimize';

class Routes {
  static DEFAULT = 'trips/';
}

export class TripService {
  static getTrip() {
    return api.get(Routes.DEFAULT).json<ITrip[]>();
  }

  static getTripById(tripId: string) {
    return api.get(`${Routes.DEFAULT}${tripId}`).json<ITripDetails>();
  }

  static createTrip(name: string) {
    return api.post(Routes.DEFAULT, { json: { name } }).json<ITrip>();
  }

  static addPlaceToTrip(tripId: string, placeId: string) {
    return api.post(`${Routes.DEFAULT}${tripId}`, {
      json: { place_id: placeId },
    });
  }

  static removePlaceFromTrip(tripId: string, placeId: string) {
    return api
      .delete(`${Routes.DEFAULT}${tripId}/places/${placeId}`)
      .json<IAttraction[]>();
  }

  static optimizeTrip(tripId: string) {
    return api
      .post(`${Routes.DEFAULT}${tripId}/optimize`)
      .json<ITripOptimize>();
  }

  static reorder(tripId: string, places: string[]) {
    return api
      .post(`${Routes.DEFAULT}${tripId}/places/reorder`, {
        json: { places },
      })
      .json<IAttraction[]>();
  }
}
