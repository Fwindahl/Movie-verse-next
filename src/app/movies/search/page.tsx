import React from "react";
import { getMovies } from "../../../../utils/requests";

interface SearchResultPage {
  params: {
    query: string;
  };
}
const SearchPage: React.FC<SearchResultPage> = async ({ params }) => {
  const searchText = params.query;
  const movies = await getMovies(searchText);
  return <div>hello world</div>;
};

export default SearchPage;
