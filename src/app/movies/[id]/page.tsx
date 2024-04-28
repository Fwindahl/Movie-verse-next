"use server";
import Link from "next/link";
import React from "react";
import { getMovieDetails } from "../../../../utils/requests";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import CarouselMovies from "@/app/components/CarouselMovies";

interface MovieDetailsPageProps {
  params: any;
}

const MovieDetailsPage: React.FC<MovieDetailsPageProps> = async ({
  params,
}) => {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w440_and_h660_face";
  const movieDetails = await getMovieDetails(params.id);
  return (
    <section className="w-full p-[5%] items-start justify-between flex flex-col">
      <Button asChild variant="outline">
        <Link className="back-btn" href={"/"}>
          Back to home
        </Link>
      </Button>
      <div className="flex items-start justify-center  md:items-center  md:flex-nowrap gap-5   w-full flex-wrap-reverse   md:w-[90%]  ">
        <div className=" w-[100%]  items-start  flex flex-col gap-4">
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
                  className="p-1 cursor-pointer text-center border border-[#00FF99] rounded-md hover:bg-[#00FF99] hover:text-black transition-all duration-200"
                >
                  {genre.name}
                </span>
              ))}
            </p>
          )}
          <p className="max-w-[700px] mb-16">{movieDetails.overview}</p>
        </div>
        <div className=" py-5 w-[40%]">
          <Image
            className="max-w-full w-80 poster-shadow h-full"
            loading="lazy"
            width={350}
            height={300}
            alt="Movie Poster"
            src={IMAGE_BASE_URL + movieDetails.poster_path}
          />
        </div>
      </div>
      <div className=" m-auto md:ml-0  w-[70%] md:w-[100%]">
        <h3 className="text-center text-2xl ">Similair Movies</h3>
        <CarouselMovies params={params} />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
