import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__item-list">
        <li className="portfolio__item">
          <a className="portfolio__link" target='_blank' rel="noreferrer"
            href="https://github.com/RandyCheBro/how-to-learn.git">
            <span className="portfolio__link-name">Статичный сайт</span>
            <span className="portfolio__link-arrow">↗</span>
          </a>
          <div className="portfolio__border"></div>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target='_blank' rel="noreferrer"
            href="https://github.com/RandyCheBro/russian-travel.git">
            <span className="portfolio__link-name">Адаптивный сайт</span>
            <span className="portfolio__link-arrow">↗</span>
          </a>
          <div className="portfolio__border"></div>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target='_blank' rel="noreferrer"
            href="https://github.com/RandyCheBro/react-mesto-api-full-gha.git">
            <span className="portfolio__link-name">Одностраничное приложение</span>
            <span className="portfolio__link-arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;