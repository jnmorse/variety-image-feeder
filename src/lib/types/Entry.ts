export enum Purity {
  NSFW = 'nsfw',
  SFW = 'sfw',
  SKETCHY = 'sketchy'
}

export enum Category {
  Anime = 'anime',
  General = 'general',
  People = 'people'
}

export type Entry = {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: Purity;
  category: Category;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: {
    large: string;
    original: string;
    small: string;
  };
};
