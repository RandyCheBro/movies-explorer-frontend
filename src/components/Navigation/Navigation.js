import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import iconAccount from "../../images/account-icon.svg"
import NavMenu from "../NavMenu/NavMenu";

function Navigation() {
const [isOpen, setIsOpen] = React.useState(false);

const handleIsOpen = () => {
  setIsOpen(!isOpen)
}

  return (
    <nav>
      <ul className="navigation">
        <NavLink className="navigation__link" to="/movies">
          Фильмы
        </NavLink>
        <NavLink className="navigation__link" to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
        <NavLink className="navigation__link" to="/profile">
          Аккаунт
          <div className="navigation__icon-box">
          <img className="navigation__icon" src={iconAccount} alt="логотип аккаунта"></img>
          </div>
        </NavLink>
      </ul>
      <button className="navigation__button-menu" onClick={handleIsOpen} type="button" aria-label="открытие"></button>
      <NavMenu isOpen={isOpen} OnClose={handleIsOpen}/>
    </nav>
  );
}

export default Navigation;
