import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"
import moviesApi from "../../../utils/MoviesApi";

function MoviesCardList(props) {
  const [movies, setMovies] = useState([]);

  useState(() => {
    moviesApi.getMovies()
    .then((movies) => {
      setMovies(movies)
    })
    .catch((err) => console.log(err))
  })

  return (
    <section className="movies-cardlist">
      {!props.isMoviesLoading ? <Preloader /> :
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