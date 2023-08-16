import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header className={`header ${isLoggedIn? "header_background_black": ""}`} >
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
