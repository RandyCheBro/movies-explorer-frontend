import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"
import MoreCards from "../MoreCards/MoreCards";
import { useLocation } from "react-router-dom";

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
  const [quantityMovies, setQuantityMovies] = useState(0);
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
    if (width > 1000) {
      setQuantityMovies(12);
    }
    if (width > 500 && width <= 1000) {
      setQuantityMovies(8);
    }
    if (width > 0 && width <= 500) {
      setQuantityMovies(5);
    }
  }, [width])

  function handleClick() {
    if (width > 1000) {
      setQuantityMovies(quantityMovies + 3);
    }
    if (width > 500 && width <= 1000) {
      setQuantityMovies(quantityMovies + 2);
    }
    if (width > 0 && width <= 500) {
      setQuantityMovies(quantityMovies + 2);
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
      <MoreCards onClick={handleClick} isMoviesMore={isMoviesMore} />
    </section>
  );
}

export default MoviesCardList;