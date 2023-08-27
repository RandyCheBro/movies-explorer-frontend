import React from "react";
import "./GeneralForm.css";
import { Link, useLocation } from 'react-router-dom';
import logo from "../../images/logo.svg";

function GeneralForm(props) {
  const location = useLocation();
  const {
    title,
    buttonName,
    linkSpanText,
    linkText,
    linkRoute
  } = props

  return (
    <section className="general">
      <div className="general__container">
        <div className="general-header">
          <Link className="general-header__logo" to={"/"}>
            <img src={logo} alt="логотип" />
          </Link>
          <h2 className="general-header__title">{title}</h2>
        </div>

        <form className="general-form">
          <fieldset className="general-form__input-fieldset">

            {location.pathname === "/signup" &&
              <div className="general-form__input-field">
                <label className="general-form__input-label" htmlFor="name"
                >Имя</label>
                <input className="general-form__input"
                  required minLength="2" maxLength="40"
                  id="name"
                  placeholder="Имя"
                  name="name" type="text"
                ></input>
                <span className="general-form__input-error"></span>
              </div>
            }

            <div className="general-form__input-field">
              <label className="general-form__input-label" htmlFor="email"
              >E-mail</label>
              <input className="general-form__input"
                required minLength="2" maxLength="40"
                id="email"
                placeholder="Email"
                name="email" type="email"
              ></input>
              <span className="general-form__input-error"></span>
            </div>

            <div className="general-form__input-field">
              <label className="general-form__input-label" htmlFor="password"
              >Пароль</label>
              <input className="general-form__input general-form__input_color_red"
                required minLength="2" maxLength="40"
                id="password"
                placeholder="Пароль"
                name="password" type="password"
              ></input>
              <span className="general-form__input-error">Что-то пошло не так...</span>
            </div>
          </fieldset>

          <div className="general-form__button-box">
            <button className="general-form__button">{buttonName}</button>
            <div className="general-form__link-field">
              <span className="general-form__link-span">{linkSpanText}</span>
              <Link className="general-form__link" to={linkRoute}>{linkText}</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default GeneralForm;