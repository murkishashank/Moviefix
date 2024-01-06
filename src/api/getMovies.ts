import { request, ResponseError } from '../utils/request';

export const getMovies = async (url: string, params: any) => {
  try {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const fullUrl = `${url}?${queryString}`;

    const response = await request(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error('Error in getMovies:', error.message);
      return { err: error };
    } else {
      throw error;
    }
  }
};
