import React from "react";
import { NavLink } from "react-router-dom";
import iconAccount from "../../images/account-icon.svg";
import "./NavMenu.css";
import "../Navigation/Navigation.css"

function NavMenu({isOpen, OnClose}) {
  return (
  <nav className={`${isOpen? "nav-menu": "nav-menu_hidden"}`}>
  <button onClick={OnClose} className="nav-menu__close-btn" type="button" aria-label="закрытие"></button>
    <ul className="nav-menu__container">
      <li className="nav-menu__item">
        <NavLink className="nav-menu__link"to="/">Главная</NavLink>
      </li>
      <li className="nav-menu__item">
        <NavLink className="nav-menu__link" to="/movies">Фильмы</NavLink>
      </li>
      <li className="nav-menu__item">
        <NavLink className="nav-menu__link"to="/saved-movies">Сохранённые фильмы</NavLink>
      </li>
      </ul>
      <div className="nav-menu__account">
        <NavLink className="nav-menu__link"to="/profile">
        Аккаунт
        <div className="navigation__icon-box">
            <img className="navigation__icon" src={iconAccount} alt="логотип аккаунта"></img>
            </div>
        </NavLink>
      </div>
  </nav>
  )
}

export default NavMenu;