import React from "react";
import "./MoreCards.css";

function MoreCards(props) {
  return (
    <>
      {!props.isMoviesMore ? <div className="more-cards__plug" /> :
        <div className="more-cards">
          <button onClick={props.onClick}
          className="more-cards__button" aria-label="Добавление фильмов" type="button"
          >Ещё</button>
        </div>
      }
    </>
  );
}

export default MoreCards;