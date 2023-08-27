import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <fieldset className="profile__fieldset">

          <div className="profile__input-field">
            <label className="profile__input-label" htmlFor="name">Имя</label>
            <input className="profile__input"
              required minLength="2" maxLength="40"
              value="Виталий"
              disabled
              id="name"
              placeholder="Имя"
              name="name" type="text"></input>
            <span className="profile__input-error input-error-name"></span>
          </div>

          <div className="profile__border"></div>

          <div className="profile__input-field">
            <label className="profile__input-label" htmlFor="email">E&#8209;mail</label>
            <input className="profile__input"
              required minLength="2" maxLength="40"
              disabled
              value="pochta@yandex.ru"
              id="email"
              placeholder="E-mail"
              name="email" type="text"></input>
            <span className="profile__input-error input-error-email"></span>
          </div>

          <div className="profile__button-field">
            <button className="profile__button profile__edit-button" type="submit">Редактировать</button>
            <button className="profile__button profile__exit-button" type="button" onClick={() => navigate('/')}>Выйти из аккаунта</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;