import { IAttraction } from './IAttraction';

export interface IThingToDo extends IAttraction {
  phone: string | null;
  photos: string[];
  website: string | null;
  description: string | null;
  subtypes: string[];
  subcategories: string[];
}
