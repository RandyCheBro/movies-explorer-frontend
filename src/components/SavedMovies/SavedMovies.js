import React, { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import { filterMovies, filterDuration } from "../../utils/helpers";

function SavedMovies({ savedMovies, handleDeleteMovie }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [inputSearch, setInputSearch] = useState("");


  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    }
    else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    const filteredMoviesList = filterMovies(savedMovies, inputSearch);
    setFilteredMovies(isCheckboxChecked ? filterDuration(filteredMoviesList) : filteredMoviesList);
  }, [savedMovies, inputSearch, isCheckboxChecked])

  function handleChangeCheckbox() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  function handleFilterMovies(inputSearchValue) {
    setInputSearch(inputSearchValue);
  }

  return (
    <main>
      <SearchForm
        getMovies={handleFilterMovies}
        isCheckboxChecked={isCheckboxChecked}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <MoviesCardList
        movies={filteredMovies}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        handleDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;