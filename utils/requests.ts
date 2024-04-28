import { Movie } from "./interfaces";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTrendingMovies = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
      throw new Error("Unable to fetch with error message: {}", error)
  }
};

export const getMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&${query}`
  );
  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSimilarMovies = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
