import { IAttraction } from './IAttraction';

export interface ITripDetails {
  places: IAttraction[];
  trips: {
    createdAt: string;
    id: string;
    isOptimized: boolean;
    name: string;
    totalDistance: number | null;
    totalDistanceKm: number | null;
    totalPlaces: number;
    updatedAt: string;
    userId: string;
  };
}
