import React from "react";
import "./AboutMe.css";
import aboutMePhoto from "../../../images/aboutme-img.png"

function AboutMe() {
  return (
    <section className="aboutme">
      <h3 className="aboutme__title title">Студент</h3>
      <div className="aboutme__border border"></div>
      <div className="aboutme__biography">
        <div className="aboutme__info">
          <h2 className="aboutme__name">Виталий</h2>
          <span className="aboutme__job">Фронтенд-разработчик, 30 лет</span>
          <p className="aboutme__description">Я родился и живу в Саратове,
           закончил факультет экономики СГУ. У меня есть жена и дочь. 
           Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал 
           кодить. С 2015 года работал в компании «СКБ Контур». После 
           того, как прошёл курс по веб-разработке, начал заниматься 
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