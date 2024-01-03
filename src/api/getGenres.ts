import { request } from '../utils/request';

export const getAllGenres = () => {
  return request(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=2dca580c2a14b55200e784d157207b4d`, {
    method: 'GET',
  });
};
