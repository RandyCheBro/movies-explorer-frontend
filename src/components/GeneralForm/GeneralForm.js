import React from "react";
import "./GeneralForm.css";
import { Link, useLocation } from 'react-router-dom';
import logo from "../../images/logo.svg";

function GeneralForm(props) {
  const location = useLocation();
  const {
    isValid,
    errors,
    values,
    onChange,
    onSubmit,
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

        <form className="general-form" onSubmit={onSubmit} noValidate>
          <fieldset className="general-form__input-fieldset">

            {location.pathname === "/signup" &&
              <div className="general-form__input-field">
                <label className="general-form__input-label" htmlFor="name"
                >Имя</label>
                <input className={`general-form__input ${errors.name && "general-form__input_color_red"}`}
                  onChange={onChange}
                  required minLength="2" maxLength="30"
                  id="name"
                  placeholder="Имя"
                  name="name" type="text"
                  value={values.name || ""}
                ></input>
                <span className={`general-form__input-error ${errors.name && "general-form__input-error_visible"}`}
                >{errors.name}</span>
              </div>
            }

            <div className="general-form__input-field">
              <label className="general-form__input-label" htmlFor="email"
              >E-mail</label>
              <input className={`general-form__input ${errors.email && "general-form__input_color_red"}`}
                onChange={onChange}
                required
                pattern=".+@.+\..+"
                id="email"
                placeholder="Email"
                value={values.email || ""}
                name="email" type="email"
              ></input>
              <span className={`general-form__input-error ${errors.email && "general-form__input-error_visible"}`}
              >{errors.email}</span>
            </div>

            <div className="general-form__input-field">
              <label className="general-form__input-label" htmlFor="password"
              >Пароль</label>
              <input className={`general-form__input ${errors.password && "general-form__input_color_red"}`}
                onChange={onChange}
                required minLength="6"
                id="password"
                placeholder="Введите пароль"
                value={values.password || ""}
                name="password" type="password"
                autoComplete="new-password"
              ></input>
              <span className={`general-form__input-error ${errors.password && "general-form__input-error_visible"}`}
              >{errors.password}</span>
            </div>
          </fieldset>

          <div className="general-form__button-box">
            <button className="general-form__button" type="submit" aria-label={buttonName}
              disabled={!isValid && true}>{buttonName}</button>

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