import { IAttraction } from './IAttraction';

interface SimplifiedHour {
  open: string;
  close: string;
}

export interface IRestaurant extends IAttraction {
  phone: string | null;
  photos: string[];
  website: string | null;
  description: string | null;
  menuWebUrl: string | null;
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
  dietaryRestrictions: string[];
  mealTypes: string[];
  cuisines: string[];
  travelerChoiceAward: boolean;
}
