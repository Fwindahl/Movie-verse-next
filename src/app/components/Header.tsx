"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// interface SearchForMovies {
//   query: string;
//   id: number;
// }
const Header = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const router = useRouter();

  const handleMovieSearch = (e: any) => {
    e.preventDefault();
    if (searchMovie) {
      router.push(`/movies/search?query=${searchMovie}`);
    }
  };
  return (
    <header
      className=" flex  flex-wrap  mb-16 h-28 justify-between items-center
    px-20 "
    >
      <Link href={"/"}>
        <h1 className=" text-[#00FF99] text-4xl font-bold">Flex Movies</h1>
      </Link>
      <nav className="flex  w-full max-w-sm items-center space-x-2">
        <form
          className="flex gap-2"
          onSubmit={(e) => handleMovieSearch(e)}
          action=""
        >
          <Input
            className="text-[#1d1d1d]"
            onChange={(e) => setSearchMovie(e.target.value)}
            type="text"
            placeholder="Sök.."
          />
          <Button variant="outline" type="submit">
            Search
          </Button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
