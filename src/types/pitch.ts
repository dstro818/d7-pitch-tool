export type Genre = string;

export interface PitchFormData {
  title: string;
  artists: string;
  genres: Genre[];
  theme: string;
  lyrics: string;
  productionElements: (typeof import('@/components/PitchForm/ProductionSelect').PRODUCTION_ELEMENTS)[number][];
  customProductionElements: string[];
  artistBackground: string;
  targetPlaylist: string;
}

export const GENRES = [
  "Adult Contemporary", "Alternative", "Alternative Rap", "Ambient", "Blues",
  "Breakbeat", "Children's Music", "Christmas", "Christian & Gospel", "Classical",
  "Country", "Dance", "Dancehall", "Electro House", "Electronic", "Electronica",
  "Experimental", "Folk", "Funk", "Hip-Hop/Rap", "Holiday", "House", "Indie Rock",
  "Jazz", "K-Pop", "Latin", "Metal", "New Age", "Pop", "Pop/Rock", "R&B/Soul",
  "Reggae", "Reggaeton", "Regional Mexicano", "Rock", "Salsa", "Singer/Songwriter",
  "Soft Rock", "Soundtrack", "Spoken Word", "Techno", "World"
];