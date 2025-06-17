import { IAttraction } from './IAttraction';
import { ISearch } from './IPaging';

interface SimplifiedHour {
  open: string;
  close: string;
}

export interface IRestaurant extends IAttraction {
  phone: string | null;
  photos: string[];
  website: string | null;
  description: string | null;
  menu_web_url: string | null;
  hours: {
    monday: SimplifiedHour;
    tuesday: SimplifiedHour;
    wednesday: SimplifiedHour;
    thursday: SimplifiedHour;
    friday: SimplifiedHour;
    saturday: SimplifiedHour;
    sunday: SimplifiedHour;
    timezone: string | null;
  } | null;
  dishes: string[];
  features: string[];
  dietary_restrictions: string[];
  meal_types: string[];
  cuisines: string[];
  traveler_choice_award: boolean;
}
export type IRestaurantSearch = ISearch<IRestaurant>;

export interface IRestaurantFilter {
  search?: string | null;
  rating?: string | null;
  cuisines: string[];
  mealTypes: string[];
  dietaryRestrictions: string[];
  features: string[];
  dishes: string[];
}
