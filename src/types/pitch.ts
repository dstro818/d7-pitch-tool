import { GENRES } from '@/components/PitchForm/GenreSelect';
import { PRODUCTION_ELEMENTS } from '@/components/PitchForm/ProductionSelect';

export type Genre = typeof GENRES[number];
export type ProductionElement = typeof PRODUCTION_ELEMENTS[number];

export interface PitchFormData {
  title: string;
  artists: string;
  genres: Genre[];
  theme: string;
  lyrics: string;
  productionElements: ProductionElement[];
  customProductionElements: string[];
  artistBackground: string;
  targetPlaylist: string;
}