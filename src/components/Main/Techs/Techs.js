import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__title title">Технологии</h3>
      <div className="techs__border border"></div>
      <h2 className="techs__subtitle">7 технологий</h2>
      <p className="techs__text text">На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.</p>
      <ul className="techs__item-list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;