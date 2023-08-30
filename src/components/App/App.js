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

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  function handleRegister({email, password, name}) {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isLoggedIn={false} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header isLoggedIn={true} />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header isLoggedIn={true} />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header isLoggedIn={true} />
              <Profile />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Register onRegister={handleRegister}/>
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
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
