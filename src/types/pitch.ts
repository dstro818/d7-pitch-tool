import { GENRES, PRODUCTION_ELEMENTS } from '@/constants/pitch';

export type PredefinedGenre = typeof GENRES[number];
export type Genre = PredefinedGenre | string;
export type ProductionElement = typeof PRODUCTION_ELEMENTS[number];

export interface PitchFormData {
  title: string;
  artists: string;
  genres: Genre[];
  theme: string;
  lyrics: string;
  production_elements: ProductionElement[];
  custom_production_elements: string[];
  artist_background: string;
  target_playlist: string;
}