export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string
  genre_ids: number[];
  overview: string;
}

export interface YearWiseMovies {
  [year: string]: Movie[];
}

export interface GenresType {
  id: number;
  name: string;
}
