import Link from "next/link";
import React from "react";
import { getSimilarMovies } from "../../../utils/requests";
import Image from "next/image";
// import imdb from "../../../public/imdb-logo-transparent.png";

//carosuell imports
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "./MovieCard";
interface CarouselSimilarMovies {
  params: any;
}

const CarouselMovies: React.FC<CarouselSimilarMovies> = async ({ params }) => {
  const similarMovies = await getSimilarMovies(params.id);

  return (
    <>
      <Carousel
        opts={{
          loop: true,
          slidesToScroll: 4,
          breakpoints: {
            "(max-width:1000px)": {
              slidesToScroll: 1,
            },
          },
        }}
        className="p-2   items-center flex w-[100%] min-h-full m-auto   "
      >
        <CarouselContent className="  min-w-[100%] h-full ">
          {similarMovies &&
            Array.isArray(similarMovies) &&
            similarMovies.map((movie: any, index: number) => (
              <CarouselItem
                key={index}
                className=" pl-[20px]  w-full lg:basis-1/3 2xl:basis-1/6 xl:basis-1/4 md:basis-1/3 sm:basis-1/2"
              >
                <Card className=" poster-shadow bg-transparent  border-transparent w-[100%] h-full  ">
                  <CardContent className="overlay p-0 flex justify-center items-center w-full min-h-[350] h-full ">
                    <MovieCard movie={movie} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarouselMovies;
