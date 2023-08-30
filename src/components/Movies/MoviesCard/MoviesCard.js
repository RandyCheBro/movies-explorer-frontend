import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(card) {
  const [buttonClass, setButtonClass] = React.useState("");
  const [isSavedMovie, setIsSavedMovie] = React.useState(false);
  const [buttonText] = React.useState("Сохранить")
  const location = useLocation();

  function handleTextContent(evt) {
    if(evt.target.textContent === "Сохранить") {
      evt.target.textContent = "";
    }
    else evt.target.textContent = "Сохранить";
  }

  function handleChangeButton(evt) {
    setIsSavedMovie(!isSavedMovie);
    handleTextContent(evt)
  }

  function hadleDeleteMovie(evt) {
    evt.target.parentElement.remove()
  }

  React.useEffect(() => {
    const buttonClassName = `movies-card__savebtn ${isSavedMovie ? "movies-card__savebtn-active" : ""}`
    setButtonClass(buttonClassName)
  }, [isSavedMovie]);

  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h4 className="movies-card__title">{card.nameRU}</h4>
        <span className="movies-card__duration">{card.duration}</span>
      </div>
      <a className="movies-card__link" href={card.trailerLink} target='_blank'
        rel="noreferrer">
        <img className="movies-card__image"
          src={`https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU} />
      </a>
      {(location.pathname === "/movies")
        ?
        <button onClick={handleChangeButton}
          aria-label="Сохранение"
          id="movie-button"
          className={buttonClass}
          type="button">
          {buttonText}
        </button>
        :
        <button onClick={hadleDeleteMovie}
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