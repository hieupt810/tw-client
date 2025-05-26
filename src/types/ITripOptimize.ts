import { IAttraction } from './IAttraction';

export interface ITripOptimize {
  is_optimized: boolean;
  message: string;
  places: IAttraction[];
}
