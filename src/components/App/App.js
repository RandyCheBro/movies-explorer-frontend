import "./App.css";
import React from "react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
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
  const { pathname } = useLocation();

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false)
  const isOpen = isTooltipPopupOpen;

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      mainApi.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
        navigate(pathname, { replace: true });
      })
        .catch((err) => {
          localStorage.removeItem("jwt")
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData)
          setSavedMovies(movies)
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

  function handleRegister({ email, password, name }) {
    if (!email || !password || !name) {
      return;
    }
    setIsFormDisabled(true);
    mainApi.register(email, password, name)
      .then(() => {
        handleLogin({ email, password });
        setIsSuccess(true);
        setIsTooltipPopupOpen(true);
        setTooltipMessage("Успешная регистрация!")
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
        if (err === "Ошибка 409") {
          setTooltipMessage("Пользователь с таким email уже существует")
        } else {
          setTooltipMessage("При регистрации пользователя произошла ошибка.")
        }
      })
      .finally(() => {
        setIsFormDisabled(false);
      })
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    setIsFormDisabled(true);
    mainApi.login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
        if (err === "Ошибка 401") {
          setTooltipMessage("Вы ввели неправильный логин или пароль.")
        } else {
          setTooltipMessage("При авторизации произошла ошибка. Токен не передан или передан не в том формате")
        }
      })
      .finally(() => {
        setIsFormDisabled(false);
      })
  }

  function handleSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  }

  function handleUpdateUser({ name, email }) {
    setIsFormDisabled(false);
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
      .finally(() => {
        setIsFormDisabled(false);
      })
  }

  function handleAddMovie(movie) {
    mainApi.addMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || i.movieId === movie.movieId)
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => !(m.movieId === movie.id || m.movieId === movie.movieId)));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function closeAllPopups() {
    setIsTooltipPopupOpen(false);
    setTooltipMessage("");
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
                <ProtectedRouteElement
                  element={Movies}
                  savedMovies={savedMovies}
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  isLoggedIn={isLoggedIn}
                ></ProtectedRouteElement>
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <ProtectedRouteElement
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  isLoggedIn={isLoggedIn}
                ></ProtectedRouteElement>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <ProtectedRouteElement
                  element={Profile}
                  onUpdate={handleUpdateUser}
                  onSignOut={handleSignOut}
                  isFormDisabled={isFormDisabled}
                  isLoggedIn={isLoggedIn}
                ></ProtectedRouteElement>
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Login
                  onLogin={handleLogin}
                  isLoggedIn={isLoggedIn}
                  isFormDisabled={isFormDisabled}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register
                  onRegister={handleRegister}
                  isLoggedIn={isLoggedIn}
                  isFormDisabled={isFormDisabled}
                />
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
