import React from "react";
import "./Promo.css";
import planetLogo from "../../../images/planet-logo.svg";
import { Link } from "react-scroll";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link className="promo__link" to="about-project" >Узнать больше</Link>
      </div>
      <img src={planetLogo} alt="логотип проекта" className="promo__image"></img>
    </section>
  );
}

export default Promo;
