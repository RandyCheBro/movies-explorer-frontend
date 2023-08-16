import React from "react";
import { Link } from "react-router-dom";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h3 className="about-project__title">О проекте</h3>
      <div className="about-project__border"></div>
      <div className="about-project__info">
        <h4 className="about-project__subtile">Дипломный проект включал 5 этапов</h4>
        <h4 className="about-project__subtile">На выполнение диплома ушло 5 недель</h4>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности
          и финальные доработки.
        </p>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
          чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__time-frame">
        <span className="about-project__time-period">1 неделя</span>
        <span className="about-project__time-period">4 недели</span>
        <span className="about-project__stage">Back-end</span>
        <span className="about-project__stage">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;