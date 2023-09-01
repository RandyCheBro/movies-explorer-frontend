import "./App.css";
import React from "react";

import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);//заменить
  const [savedMovies, setSavedMovies] = React.useState([]);
  const isOpen = isTooltipPopupOpen;

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      mainApi.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          /* navigate("movies", { replace: true }) */
          setUserEmail(res.email)
        }
      })
        .catch((err) => {
          localStorage.removeItem("jwt")
          console.log(err)
        })
    }
  }, [navigate])

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData)
          console.log(userData, movies)//удалить
          setSavedMovies(movies)
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

  function handleRegister({ email, password, name }) {
    if (!email || !password || !name) {
      return;
    }
    mainApi.register(email, password, name)
      .then(() => {
        console.log(email)
        navigate("/signin", { replace: true });
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      })
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    mainApi.login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("jwt", data.token);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setIsSuccess(false)
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  }

  function handleUpdateUser({ name, email }) {
    mainApi.updateUser({ name, email })
      .then((data) => {
        setCurrentUser(data);
        setIsTooltipPopupOpen(true);
        setIsSuccess(true);
        setTooltipMessage("Профиль обновлён!")
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
        if (err === "Ошибка 409") {
          setTooltipMessage("Пользователь с таким email уже существует")
        } else {
          setTooltipMessage("При обновлении профиля произошла ошибка.")
        }
      })
  }

  function closeAllPopups() {
    setIsTooltipPopupOpen(false);
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeAllPopupsByOverlay(evt) {
      if (evt.target.classList.contains("popup_is-opened")) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mousedown', closeAllPopupsByOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mousedown', closeAllPopupsByOverlay);
      }
    }
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Profile onUpdate={handleUpdateUser} onSignOut={handleSignOut} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          tooltipMessage={tooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
