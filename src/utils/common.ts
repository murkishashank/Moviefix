import { YearWiseMovies } from '../types';
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  overview: string;
}

export const getYearWiseMovies = (movies: Movie[], selectedGenres: number[] | null): YearWiseMovies => {
  if (!movies.length) {
    return {};
  }

  const sortedMovies = [...movies].sort((a, b) => {
    const dateA = new Date(a.release_date).getTime();
    const dateB = new Date(b.release_date).getTime();
    return dateA - dateB;
  });

  const uniqueMoviesMap = new Map<number, Movie>();

  const result = sortedMovies.reduce((acc: YearWiseMovies, movie: Movie) => {
    const year = movie.release_date?.split('-')[0] || '1970';

    if (!acc[year]) {
      acc[year] = [];
    }

    if ((selectedGenres === null || selectedGenres.every(genreId => movie.genre_ids.includes(genreId))) && acc[year].length < 20 && !uniqueMoviesMap.has(movie.id)) {
      acc[year].push(movie);
      uniqueMoviesMap.set(movie.id, movie);
    }

    return acc;
  }, {});

  return result;
};

export const getImageUrl = (endPoint: string): string => {
  return `https://image.tmdb.org/t/p/w500${endPoint}`;
};
