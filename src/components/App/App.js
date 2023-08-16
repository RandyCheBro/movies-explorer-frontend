import "./App.css";
import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
