import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {

  return (
    <section className="not-found">
      <div className="not-found__info">
        <h2 className="not-found__title">404</h2>
        <span className="not-found__text">Страница не найдена</span>
      </div>
      <Link className="not-found__link" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;