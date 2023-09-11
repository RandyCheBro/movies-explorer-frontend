import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {

  const {
    card,
    savedCard,
    handleAddMovie,
    handleDeleteMovie,
  } = props;

  const [buttonClass, setButtonClass] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Сохранить")
  const { pathname } = useLocation();

  function getCurrentDuration() {
    const hours = Math.trunc(card.duration / 60)
    const minutes = card.duration - hours * 60
    if (hours === 0) {
      return `0ч ${card.duration}м`
    } else {
      return `${hours}ч ${minutes}м`
    }
  }

  function handleChangeButton() {
    if (savedCard) {
      handleDeleteMovie(card)
    } else {
      handleAddMovie(card);
    }
  }

  function hadleDeleteButton() {
    handleDeleteMovie(card)
  }

  useEffect(() => {
    if (savedCard) {
      setButtonText("");
    } else {
      setButtonText("Сохранить")
    }
  }, [savedCard])

  useEffect(() => {
    const buttonClassName = `movies-card__savebtn ${savedCard ? "movies-card__savebtn-active" : ""}`
    setButtonClass(buttonClassName)
  }, [savedCard]);

  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h4 className="movies-card__title">{card.nameRU}</h4>
        <span className="movies-card__duration">{getCurrentDuration()}</span>
      </div>
      <a className="movies-card__link" href={card.trailerLink} target='_blank'
        rel="noreferrer">
        <img className="movies-card__image"
          src={(typeof card.image) === "string" ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU} />
      </a>
      {(pathname === "/movies")
        ?
        <button onClick={handleChangeButton}
          aria-label="Сохранение"
          id="movie-button"
          className={buttonClass}
          type="button">
          {buttonText}
        </button>
        :
        <button onClick={hadleDeleteButton}
          aria-label="Удаление"
          id="movie-button"
          className="movies-card__delete"
          type="button">
        </button>
      }

    </li>
  );
}

export default MoviesCard;