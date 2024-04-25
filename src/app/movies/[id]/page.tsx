"use server";
import Link from "next/link";
import React from "react";
import { getMovieDetails, getSimilarMovies } from "../../../../utils/requests";
import { Movie } from "../../../../utils/interfaces";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import imdb from "../../../../public/imdb-logo-transparent.png";

//carosuell imports
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <main className=" flex flex-col gap-10">
      <section className="w-full max-w-screen-md:flex-wrap-reverse relative  flex h-full justify-between gap-5">
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
                  <span
                    className={`p-1 text-[12px] font-medium rounded-md text-black ${
                      movieDetails.status === "Released"
                        ? "bg-[#00ff99]"
                        : "bg-[#F2B137]"
                    }`}
                  >
                    {movieDetails.status}
                  </span>
                </p>

                {movieDetails.genres && (
                  <p className="max-detail-container flex flex-wrap gap-2">
                    {movieDetails.genres.map((genre: any, index: number) => (
                      <span
                        key={index}
                        className="p-1 text-center border border-[#00FF99] rounded-md hover:bg-[#00FF99] hover:text-black transition-all duration-200"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </p>
                )}
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
            <h1 className="rwd-h1 pl-[10%]">Similair Movies</h1>
            <Carousel className="p-5 w-[70%] max-w-screen-md:w-20  min-h-full  m-auto ">
              <CarouselContent className=" min-w-[70%] h-full ">
                {similarMovies &&
                  Array.isArray(similarMovies) &&
                  similarMovies.map((movie: any, index: number) => (
                    <CarouselItem
                      key={index}
                      className=" p-0  w-full justify-center flex  lg:basis-1/3 xl:basis-1/4 md:basis-1/3 sm:basis-1/2"
                    >
                      <Card className=" poster-shadow bg-transparent  border-transparent w-[100%] h-full  ">
                        <CardContent className="overlay p-0 flex justify-center items-center w-full min-h-[350] h-full ">
                          <Link href={"similarMovie.id"}>
                            {/* <h5 className=" text-white items-center justify-center gap-2">
                      {movie.title}{" "}
                      <span className="flex items-center">
                      {" "}
                      <br />
                      <Image className="w-8" alt="imdb" src={imdb} />
                      {movie.vote_average.toFixed(1)}
                      </span>{" "}
                    </h5> */}
                            <Image
                              className=" movie-img object-contain max-w-full w-full h-full"
                              width={300}
                              height={260}
                              alt="test"
                              src={IMAGE_BASE_URL + movie.poster_path}
                            ></Image>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </section>
        <Image
          loading="lazy"
          className=" h-screen  mobile-bg min-h-full object-cover  opacity-20 backdrop-shadow"
          width={600}
          height={1000}
          src={IMAGE_BASE_URL + movieDetails.backdrop_path}
          alt={movieDetails.title + "Background image"}
        />
      </section>
    </main>
  );
};

export default MovieDetailsPage;
