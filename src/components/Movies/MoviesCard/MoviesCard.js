import React from "react";
import "./MoviesCard.css";

function MoviesCard(cards) {
  const [isSavedMovie, setIsSavedMovie] = React.useState(false)

  function handleSavedMovie() {
    setIsSavedMovie(!isSavedMovie)
  }

  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h4 className="movies-card__title">{cards.nameRU}</h4>
        <span className="movies-card__duration">{cards.duration}</span>
      </div>
      <a className="movies-card__link" href={cards.trailerLink} target='_blank'
        rel="noreferrer">
        <img className="movies-card__image"
          src={cards.image}
          alt={cards.nameRU} />
      </a>
      <button onClick={handleSavedMovie}
        className={`movies-card__savebtn ${isSavedMovie ? "movies-card__savebtn-active" : ""}`}
        type="button">
        {`${isSavedMovie ? "" : "Сохранить"}`}
      </button>
    </li>
  );
}

export default MoviesCard;