"use client";
import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../../utils/requests";
import MovieCard from "./components/MovieCard";
import { Movie } from "../../utils/interfaces";
import Header from "./components/Header";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Det uppstod ett fel:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen flex-col w-[95%] m-auto justify-center items-center">
      <Header></Header>

      <h1 className="text-3xl mb-5 text-primary-foreground">
        Top trending movies
      </h1>
      <div className="movie-layout pb-28">
        {movies.map((movie: Movie) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
      </div>
    </main>
  );
}
