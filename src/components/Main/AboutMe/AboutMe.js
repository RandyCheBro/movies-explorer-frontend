import React from "react";
import "./AboutMe.css";
import aboutMePhoto from "../../../images/igQ4khno424.jpg"

function AboutMe() {
  return (
    <section className="aboutme">
      <h3 className="aboutme__title title">Студент</h3>
      <div className="aboutme__border border"></div>
      <div className="aboutme__biography">
        <div className="aboutme__info">
          <h2 className="aboutme__name">Николай</h2>
          <span className="aboutme__job">Фронтенд-разработчик, 32 года</span>
          <p className="aboutme__description">Я родился в городе Мегион Тюменской обл. живу в Северодвинске,
            закончил САФУ по специальности автомеханик. После армии работал инкассатором. Позже работал на судопроизводстве в России и Финляндии
            Я люблю читать историческое фэнтэзи и научную фантастику, а ещё увлекаюсь бодибилдингом и футболом. Недавно начал
            кодить. С 2022 года начал обучение веб-разработке. После
            того, как прошёл курс, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutme__link" href="https://github.com/RandyCheBro"
            target='_blank' rel="noreferrer">Github</a>
        </div>
        <img className="aboutme__photo" src={aboutMePhoto} alt="фото автора" />
      </div>
    </section>
  );
}

export default AboutMe;