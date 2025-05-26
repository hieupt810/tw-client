import { IAttraction } from './IAttraction';

export interface ITripDetails {
  places: IAttraction[];
  trips: {
    created_at: string;
    id: string;
    is_optimized: boolean;
    name: string;
    total_places: number;
    updated_at: string;
    user_id: string;
  };
}
