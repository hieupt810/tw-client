import { IAttraction } from './IAttraction';

export interface ITripOptimize {
  isOptimized: boolean;
  message: string;
  places: IAttraction[];
  totalDistance: number;
  totalDistanceKm: number;
}
