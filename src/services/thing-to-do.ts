import api from '@/lib/api';
import { IAttractionPaging } from '@/types/IAttraction';
import { IThingToDo } from '@/types/IThingToDo';

class Routes {
  static DEFAULT = 'things-to-do/';
}

export class ThingToDoService {
  static list(page: number = 1, size: number = 10, search: string) {
    return api
      .get(Routes.DEFAULT, { searchParams: { page, size, search } })
      .json<IAttractionPaging>();
  }

  static details(id: string) {
    return api.get(`${Routes.DEFAULT}${id}/`).json<IThingToDo>();
  }

  static delete(id: string) {
    return api.delete(`${Routes.DEFAULT}${id}`).json();
  }

  static edit(id: string, data: IThingToDo) {
    return api.put(`${Routes.DEFAULT}${id}`, { json: data }).json();
  }
}
