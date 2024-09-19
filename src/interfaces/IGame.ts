export interface IGameSearchResult {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  name: string;
}

export interface IGameDetails extends IGameSearchResult {
  platforms: {
    id: number;
    name: string;
  }[];
  first_release_date: number;
}

export interface IGameReleases {
  name: string;
  cover: { id: number; url: string };
  first_release_date: number;
  release_dates: {
    id: number;
    human: string;
  }[];
  id: number;
}
