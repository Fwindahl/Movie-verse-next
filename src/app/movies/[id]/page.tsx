import Link from "next/link";
import React from "react";
import { getMovieDetails, getSimilarMovies } from "../../../../utils/requests";
import { Movie } from "../../../../utils/interfaces";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MovieDetailsPageProps {
  movie: Movie;
  params: any;
}
const MovieDetailsPage: React.FC<MovieDetailsPageProps> = async ({
  params,
}) => {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w440_and_h660_face";
  const movieDetails = await getMovieDetails(params.id);
  const similarMovies = await getSimilarMovies(params.id);
  console.log(similarMovies);
  return (
    <main className="w-full   flex h-full justify-between gap-5">
      <section className="flex-col max-w-3xl pl-32 flex items-start justify-center gap-5 w-full">
        <div className="flex flex-col gap-5">
          <Image
            loading="lazy"
            width={50}
            height={100}
            alt="Movie Poster"
            src={IMAGE_BASE_URL + movieDetails.poster_path}
          />

          <div>
            <h1 className="text-5xl">{movieDetails.title}</h1>
            <h5>{movieDetails.tagline}</h5>
          </div>
          <p>
            {movieDetails.release_date}{" "}
            <span className="p-1 rounded-md text-black bg-[#00FF99]">
              {movieDetails.status}
            </span>
          </p>

          <p className="flex  gap-2">
            {movieDetails.genres.map((genre: any) => {
              return (
                <span className="p-1 border border-[#00FF99] rounded-md hover:bg-[#00FF99] hover:text-black transition-all duration-200">
                  {genre.name}
                </span>
              );
            })}
          </p>
        </div>
        <p>{movieDetails.overview}</p>
        <Button asChild variant="outline">
          <Link href={"/"}>Back to home</Link>
        </Button>
      </section>
      <Image
        loading="lazy"
        className="h-screen object-cover  opacity-20 backdrop-shadow"
        width={600}
        height={1000}
        src={IMAGE_BASE_URL + movieDetails.backdrop_path}
        alt="asdas"
      />
    </main>
  );
};

export default MovieDetailsPage;
