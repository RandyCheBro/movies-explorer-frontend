import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import cards from "../../utils/cards"
import MoreCards from "./MoreCards/MoreCards"

function Movies() {
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(true)
  /* const [isMoviesMore, setIsMoviesMore] = React.useState() */

  function handleMoviesLoading() {
    setIsMoviesLoading(!isMoviesLoading)
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} isMoviesLoading={isMoviesLoading}/>
      <MoreCards onClick={handleMoviesLoading} isMoviesMore={true}/>
    </section>
  );
}

export default Movies;