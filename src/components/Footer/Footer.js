import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__border border"></div>
      <div className="footer__info">
        <span className="footer__date">&copy;{new Date().getFullYear()}</span>
        <nav className="footer__nav">
          <ul className="footer__item-list">
            <li className="footer__item">
              <a className="footer__link" href="https://practicum.yandex.ru/"
                target='_blank' rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com"
                target='_blank' rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;