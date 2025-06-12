import { IAttraction } from './IAttraction';

export interface ITripDetails {
  places: IAttraction[];
  trip: {
    created_at: string;
    id: string;
    isOptimized: boolean;
    name: string;
    total_places: number;
    updated_at: string;
    user_id: string;
    status: boolean;
    statusText: string;
  };
}
