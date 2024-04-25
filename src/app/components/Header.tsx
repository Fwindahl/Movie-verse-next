import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header
      className="flex  border-[#00FF99] mb-16 h-28 justify-between items-center px
    px-20 "
    >
      <Link href={"/"}>
        <h1 className=" text-[#00FF99]  text-4xl font-bold">Flex Movies</h1>
      </Link>
      <nav className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Sök.." />
        <Button variant="outline" type="submit">
          Search
        </Button>
      </nav>
    </header>
  );
};

export default Header;
