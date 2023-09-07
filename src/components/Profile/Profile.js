import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

function Profile({ onUpdate, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useForm()
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, setValues])

  useEffect(() => {
    if ((currentUser.name === values.name && currentUser.email === values.email) || !isValid) {
      setIsDisabled(true)
    }
    else setIsDisabled(false)
  }, [currentUser, values, isValid])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdate({
      name: values.name,
      email: values.email
    })
  }

  return (
    <main>
      <section className="profile">
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <fieldset className="profile__fieldset">

            <div className="profile__input-field">
              <label className="profile__input-label" htmlFor="name">Имя</label>
              <input className={`profile__input ${errors.name && "profile__input_color_red"}`}
                onChange={handleChange}
                required minLength="2" maxLength="30"
                value={values.name || ""}
                id="name"
                placeholder="Имя"
                autoComplete="off"
                name="name" type="text"></input>
              <span className={`profile__input-error ${errors.name && "profile__input-error_visible"}`}
              >{errors.name}</span>
            </div>

            <div className="profile__border"></div>

            <div className="profile__input-field">
              <label className="profile__input-label" htmlFor="email">E&#8209;mail</label>
              <input className={`profile__input ${errors.email && "profile__input_color_red"}`}
                onChange={handleChange}
                required
                value={values.email || ""}
                id="email"
                placeholder="E-mail"
                autoComplete="new-email"
                name="email" type="email"></input>
              <span className={`profile__input-error ${errors.email && "profile__input-error_visible"}`}
              >{errors.email}</span>
            </div>

            <div className="profile__button-field">
              <button className="profile__button profile__edit-button" type="submit"
                disabled={isDisabled}>Редактировать</button>
              <button className="profile__button profile__exit-button" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default Profile;