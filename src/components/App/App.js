import "./App.css";
import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../../NotFound/NotFound";

function App() {
  return (
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
              <Register />
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
  );
}

export default App;
