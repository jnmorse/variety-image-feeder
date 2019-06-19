import fetch from 'node-fetch'
import { WallhavenResults } from "./types/WallhavenResults";

export class FetchImages {
  results: WallhavenResults = {
    data: [],
    meta: {
      current_page: 1,
      last_page: 0,
      per_page: 0,
      total: 0
    }
  }

  constructor(private url: string) { }

  async fetchCurrent(): Promise<void> {
    const request = await fetch(this.url)

    const results: WallhavenResults = await request.json()

    this.results = results
  }
}