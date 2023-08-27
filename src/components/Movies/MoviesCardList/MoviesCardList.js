import React from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList(props) {
  return (
    <section className="movies-cardlist">
      {!props.isMoviesLoading ? <Preloader /> :
        <ul className="movies-cardlist__table">
          {props.cards.map(card => (
            <MoviesCard
              {...card}
              key={card.movieId}
            />
          ))}
        </ul>
      }
    </section>
  );
}

export default MoviesCardList;