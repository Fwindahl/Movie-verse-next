"use server";
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
    <main className="w-full max-w-screen-md:flex-wrap-reverse relative  flex h-full justify-between gap-5">
      <section className="py-10 w-full pl-10  ">
        <Button asChild variant="outline">
          <Link className="back-btn" href={"/"}>
            Back to home
          </Link>
        </Button>
        <section className="flex-col max-w-full flex-wrap mobile-pad  flex items-start justify-start gap-5 w-full">
          <div className="flex gap-5 justify-start   items-start w-full max-w-full">
            <div className=" w-[60%] flex flex-col gap-3">
              <div>
                <h1 className="rwd-h1">{movieDetails.title}</h1>
                <h5>{movieDetails.tagline}</h5>
              </div>
              <p className="flex max-detail-container gap-3 items-center flex-wrap">
                {movieDetails.release_date}{" "}
                <span className="p-1 rounded-md text-black bg-[#00FF99]">
                  {movieDetails.status}
                </span>
              </p>

              <p className=" max-detail-container flex flex-wrap  gap-2">
                {movieDetails.genres.map((genre: any, index: number) => {
                  return (
                    <span
                      key={index}
                      className="p-1 text-center border border-[#00FF99] rounded-md hover:bg-[#00FF99] hover:text-black transition-all duration-200"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              <Image
                className="max-w-full poster-shadow w-full"
                loading="lazy"
                width={100}
                height={100}
                alt="Movie Poster"
                src={IMAGE_BASE_URL + movieDetails.poster_path}
              />
            </div>
          </div>
          <p>{movieDetails.overview}</p>
        </section>
      </section>
      <Image
        loading="lazy"
        className=" h-screen  mobile-bg min-h-full object-cover  opacity-20 backdrop-shadow"
        width={600}
        height={1000}
        src={IMAGE_BASE_URL + movieDetails.backdrop_path}
        alt="asdas"
      />
    </main>
  );
};

export default MovieDetailsPage;
