"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getTrendingMovies } from "../../utils/requests";
import MovieCard from "./components/MovieCard";
import { Movie } from "../../utils/interfaces";
import Header from "./components/Header";
import { AsyncStatus, handleLoading } from "../../utils/util";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.idle)

  

  const fetchMovies = useCallback( async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    } catch (error) {
      console.error("Det uppstod ett fel:", error);
    }
  },[])
  

  useEffect(() => {
    if(!!movies.length){
      fetchMovies().then(()=>{
        handleLoading(AsyncStatus.success, 300, setStatus)
      }).catch(()=>{
        setStatus(AsyncStatus.fail);
      })
    }

    return () => {
      setStatus(AsyncStatus.idle)
    }
  }, []);

  return (
    <main className="min-h-screen flex-col w-[95%] m-auto justify-center items-center">
      <Header></Header>

      <h1 className="text-3xl mb-5 text-primary-foreground">
        Top trending movies
      </h1>
      <div className="movie-layout pb-28">
        {status == AsyncStatus.success && movies.map((movie: Movie) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
        {status == AsyncStatus.pending && ["1","2"].map((skel) => {
          return <div key={skel}>{skel}</div>;
        })}
      </div>
    </main>
  );
}
