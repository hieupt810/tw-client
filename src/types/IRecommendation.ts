import { IPaging } from './IPaging';

export interface IRecommendation {
  created_at: string;
  description: string;
  element_id: string;
  image: string;
  is_favorite: boolean;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  photos: string[];
  rating: number;
  rating_histogram: number[];
  raw_ranking: number;
  recommendation_reason: string;
  similarity_score: number;
  street: string;
  subcategories: string[];
  subtypes: string[];
  type: string;
  website: string;
}

export type IRecommendationPaging = IPaging<IRecommendation>;
