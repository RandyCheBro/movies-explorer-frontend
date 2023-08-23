import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link} from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function Header({isLoggedIn}) {

  return (
    <header className={`header ${isLoggedIn? "header-auth": ""}`} >
      <Link className="header__logo" to={"/"}>
      <img  src={logo} alt="логотип" />
      </Link>
      {
        isLoggedIn? (<Navigation />): (
          <div className="header__box">
          <Link className="header__signup-link" to="/sign-up">Регистрация</Link>
          <button className="header__signin-button" type="button">Войти</button>
        </div>
        )
      }
    </header>
  );
}

export default Header;
