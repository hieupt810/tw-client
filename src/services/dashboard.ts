import api from '@/lib/api';
import {
  IPlaceDashboardPaging,
  ISummary,
  IUserRegister,
} from '@/types/IDashboard';

const Route = {
  DEFAULT: 'dashboard/statistics/',
};

export class DashboardService {
  static async summary() {
    return api.get(`${Route.DEFAULT}summary`).json<ISummary>();
  }
  static async userRegister() {
    return api.get(`${Route.DEFAULT}users/monthly`).json<IUserRegister>();
  }
  static async topPlaceIntoTrip(
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) {
    return api
      .get(`${Route.DEFAULT}places`, {
        searchParams: { place_type, order, page, size },
      })
      .json<IPlaceDashboardPaging>();
  }
  static async topPlaceRanking(
    place_type: string,
    order: string,
    page: number,
    size: number,
  ) {
    return api
      .get(`${Route.DEFAULT}places/ranking`, {
        searchParams: { place_type, order, page, size },
      })
      .json<IPlaceDashboardPaging>();
  }
}
