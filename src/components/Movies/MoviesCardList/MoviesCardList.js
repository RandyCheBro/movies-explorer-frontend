import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList(props) {
  const {
    isMoviesLoading,
    movies,
    savedMovies,
    isNotFound,
    errorReqMovies
  } = props
  const []
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(width > 1000) {
      movies.slice(0, 8)
    }
  })
  console.log(width)
  console.log(movies.slice(0, 2))

  return (
    <section className="movies-cardlist">
      {isNotFound &&
        <span className="movies-cardlist__span-notfound">Ничего не найдено</span>
      }
      {errorReqMovies &&
        <span className="movies-cardlist__span-notfound">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
      }
      {isMoviesLoading ? <Preloader /> :
        <ul className="movies-cardlist__table">
          {movies.map(card => (
            <MoviesCard
              {...card}
              key={card.id}
            />
          ))}
        </ul>
      }
    </section>
  );
}

export default MoviesCardList;