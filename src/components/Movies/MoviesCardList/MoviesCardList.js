import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"
import MoreCards from "../MoreCards/MoreCards";
import { useLocation } from "react-router-dom";
import {
  FULL_SCREEN_BREAKPOINT, TABLET_SCREEN_BREAKPOINT,
  MOBILE_SCREEN_BREAKPOINT, FULL_SCREEN_QUANTITY_MOVIES,
  TABLET_SCREEN_QUANTITY_MOVIES,
  MOBILE_SCREEN_QUANTITY_MOVIES, FULL_SCREEN_MORE_BUTTON,
  TABLET_SCREEN_MORE_BUTTON, INITIAL_STATE_QUANTITY_MOVIES
} from "../../../utils/constants"

function MoviesCardList(props) {
  const {
    isMoviesLoading,
    movies,
    savedMovies,
    isNotFound,
    errorReqMovies,
    handleAddMovie,
    handleDeleteMovie
  } = props

  const { pathname } = useLocation();
  const [quantityMovies, setQuantityMovies] = useState(INITIAL_STATE_QUANTITY_MOVIES);
  const [isMoviesMore, setIsMoviesMore] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (pathname === "/saved-movies" || movies.length <= quantityMovies) {
      setIsMoviesMore(false)
    }
    else setIsMoviesMore(true);
  }, [pathname, quantityMovies, movies])

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > FULL_SCREEN_BREAKPOINT) {
      setQuantityMovies(FULL_SCREEN_QUANTITY_MOVIES);
    }
    if (width > TABLET_SCREEN_BREAKPOINT && width <= FULL_SCREEN_BREAKPOINT) {
      setQuantityMovies(TABLET_SCREEN_QUANTITY_MOVIES);
    }
    if (width > MOBILE_SCREEN_BREAKPOINT && width <= TABLET_SCREEN_BREAKPOINT) {
      setQuantityMovies(MOBILE_SCREEN_QUANTITY_MOVIES);
    }
  }, [width])

  function handleClick() {
    if (width > FULL_SCREEN_BREAKPOINT) {
      setQuantityMovies(quantityMovies + FULL_SCREEN_MORE_BUTTON);
    }
    if (width > TABLET_SCREEN_BREAKPOINT && width <= FULL_SCREEN_BREAKPOINT) {
      setQuantityMovies(quantityMovies + TABLET_SCREEN_MORE_BUTTON);
    }
    if (width > MOBILE_SCREEN_BREAKPOINT && width <= TABLET_SCREEN_BREAKPOINT) {
      setQuantityMovies(quantityMovies + TABLET_SCREEN_MORE_BUTTON);
    }
  }

  function findSavedCard(card, savedMovies) {
    return savedMovies.find((movie) => movie.movieId === (card.id || card.movieId))
  }

  return (
    <section className="movies-cardlist">
      {isNotFound &&
        <span className="movies-cardlist__span-notfound">Ничего не найдено</span>
      }
      {errorReqMovies &&
        <span className="movies-cardlist__span-notfound">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
      }
      {isMoviesLoading && <Preloader />}
      {!isNotFound && !errorReqMovies && !isMoviesLoading &&
        <>
          {pathname === "/saved-movies" ?
            <ul className="movies-cardlist__table">
              {movies.map(card => (
                <MoviesCard
                  key={card.movieId || card.id}
                  card={card}
                  savedCard={findSavedCard(card, savedMovies)}
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />
              ))}
            </ul>
            :
            <ul className="movies-cardlist__table">
              {movies.slice(0, quantityMovies).map(card => (
                <MoviesCard
                  key={card.movieId || card.id}
                  card={card}
                  savedCard={findSavedCard(card, savedMovies)}
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />
              ))}
            </ul>
          }
        </>
      }

      <MoreCards onClick={handleClick} isMoviesMore={isMoviesMore} />
    </section>
  );
}

export default MoviesCardList;