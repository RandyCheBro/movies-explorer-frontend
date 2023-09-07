import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoreCards from "./MoreCards/MoreCards"
import moviesApi from "../../utils/MoviesApi";
import { filterMovies, filterDuration } from "../../utils/helpers";

function Movies({ savedMovies }) {
  const [isMoviesLoading, setIsMoviesLoading] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [errorReqMovies, setErrorReqMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'))
      if (isCheckboxChecked) {
        setFilteredMovies(filterDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [isCheckboxChecked])

  useEffect(() => {
    if (localStorage.getItem('inputSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])


  useEffect(() => {
    if (localStorage.getItem('checkboxValue') === 'true')
      setIsCheckboxChecked(true)
  }, [])

  function handleMoviesLoading() {
    setIsMoviesLoading(!isMoviesLoading)
  }

  function handleFilterMovies(movies, inputSearch, isCheckboxChecked) {
    const filteredMoviesList = filterMovies(movies, inputSearch);
    setFoundMovies(filteredMoviesList);
    setFilteredMovies(isCheckboxChecked ? filterDuration(filteredMoviesList) : filteredMoviesList);
    localStorage.setItem('movies', JSON.stringify(filteredMoviesList));
  }

  function handleChangeCheckbox(evt) {
    setIsCheckboxChecked(!isCheckboxChecked);
    localStorage.setItem('checkboxValue', evt.target.checked)

    console.log(localStorage.getItem('checkboxValue'))
  }

  function handleGetMovies(inputSearch) {
    localStorage.setItem('inputSearch', inputSearch)
    localStorage.setItem('checkboxValue', isCheckboxChecked)
    console.log(localStorage.getItem('checkboxValue'))
    if (allMovies.length === 0) {
      setIsMoviesLoading(true)
      moviesApi.getMovies()
        .then(movies => {
          setAllMovies(movies)
          handleFilterMovies(movies, inputSearch, isCheckboxChecked)
        })
        .catch((err) => {
          console.log(err)
          setErrorReqMovies(true)
        })
        .finally(() => {
          setIsMoviesLoading(false)
        })
    } else {
      handleFilterMovies(allMovies, inputSearch, isCheckboxChecked)
    }
  }

  return (
    <main>
      <SearchForm
        getMovies={handleGetMovies}
        isCheckboxChecked={isCheckboxChecked}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <MoviesCardList
        isMoviesLoading={isMoviesLoading}
        movies={filteredMovies}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        errorReqMovies={errorReqMovies}
      />
      <MoreCards onClick={handleMoviesLoading} isMoviesMore={true} />
    </main>
  );
}

export default Movies;