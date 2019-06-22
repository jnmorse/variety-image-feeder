import fetch from 'node-fetch';
import { WallhavenResults } from './types/WallhavenResults';
import { Categories } from './types/Categories';
import { Purity } from './types/Purity';

export enum Sorting {
  Random
}

export type WallhaveApiOptions = {
  apiKey: string;
  categories?: Categories;
  purity?: Purity;
  sorting?: Sorting;
  resolution?: string;
};

export class FetchImages {
  private url: URL = new URL('https://wallhaven.cc/api/v1/search');

  results: WallhavenResults = {
    data: [],
    meta: {
      current_page: 1,
      last_page: 0,
      per_page: 0,
      total: 0
    }
  };

  constructor(private options: WallhaveApiOptions) {
    this.url.searchParams.set('apikey', options.apiKey);

    if (options.purity) {
      const [SFW, Sketchy, NSFW] = options.purity;

      this.url.searchParams.set('purity', `${SFW}${Sketchy}${NSFW}`);
    }

    if (options.categories) {
      const [General, Anime, People] = options.categories;

      this.url.searchParams.set('categories', `${General}${Anime}${People}`);
    }

    if (options.resolution) {
      this.url.searchParams.set('resolution', options.resolution);
    }
  }

  async fetchCurrent(): Promise<void> {
    const request = await fetch(this.url.toString());

    const results: WallhavenResults = await request.json();

    this.results = results;
  }
}
