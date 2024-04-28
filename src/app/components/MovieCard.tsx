import React from "react";
import Link from "next/link";
import logo from "../../../public/imdb-logo-transparent.png";
import { Movie } from "../../../utils/interfaces";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const IMAGE_URL = "https://www.themoviedb.org/t/p/w440_and_h660_face";
  return (
    <>
      <HoverCard openDelay={50} closeDelay={50}>
        <div className=" w-60 ">
          <Link className="w-full" href={"/movies/" + movie.id}>
            <div className="overlay  relative flex-col flex items-center">
              <HoverCardTrigger className="w-full" asChild>
                <Image
                  width={440}
                  height={660}
                  className="movie-img relative "
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title + "poster"}
                  priority={true}
                />
              </HoverCardTrigger>
              <HoverCardContent
                className="w-full text-[100%] min-w-60 text-balance  border-transparent  bg-[#1d1d1dc7]  hover:bg-[#000000]  text-white absolute bottom-1  rounded-none"
                avoidCollisions={false}
                align="start"
              >
                <h2 className="font-bold">{movie.title}</h2>
                <div className="flex items-center gap-1">
                  <Image className="w-8" src={logo} alt="IMDB" />

                  <p className="text text-sm">
                    {movie.vote_average.toFixed(1)} | {movie.release_date}
                  </p>
                </div>
              </HoverCardContent>
            </div>
          </Link>
        </div>
      </HoverCard>
    </>
  );
};

export default MovieCard;
