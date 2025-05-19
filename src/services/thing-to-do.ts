import { ThingToDoRoutes } from '@/constants/routes';
import api from '@/lib/api';
import { IAttraction, IAttractionPaging } from '@/types/IAttraction';
import { IThingToDo } from '@/types/IThingToDo';

export class ThingToDoService {
  static list(page: number = 1, size: number = 10) {
    return api
      .get(ThingToDoRoutes.DEFAULT, { searchParams: { page, size } })
      .json<IAttractionPaging>();
  }

  static shortDetails(id: string) {
    return api
      .get(`${ThingToDoRoutes.DEFAULT}${id}/short-details`)
      .json<IAttraction>();
  }

  static details(id: string) {
    return api
      .get(`${ThingToDoRoutes.DEFAULT}${id}/details`)
      .json<IThingToDo>();
  }

  static delete(id: string) {
    return api.delete(`${ThingToDoRoutes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IThingToDo) {
    return api.put(`${ThingToDoRoutes.DEFAULT}${id}`, { json: data }).json();
  }
}
