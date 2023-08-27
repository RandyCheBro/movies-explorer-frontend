import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import cards from "../../utils/cards"
import MoreCards from "../Movies/MoreCards/MoreCards"

function SavedMovies() {
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(true)

  function handleMoviesLoading() {
    setIsMoviesLoading(!isMoviesLoading)
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} isMoviesLoading={isMoviesLoading}/>
      <MoreCards onClick={handleMoviesLoading} isMoviesMore={false}/>
    </section>
  );
}

export default SavedMovies;