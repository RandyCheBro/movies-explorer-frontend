import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom";

function SearchForm({ getMovies, isCheckboxChecked, handleChangeCheckbox }) {
  const { pathname } = useLocation();
  const [isSpanError, setIsSpanError] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  function handleSubmit(evt) {
    evt.preventDefault();
    if (!searchValue) {
      setIsSpanError(true)
    } else {
      getMovies(searchValue)
      setIsSpanError(false)
    }
  }

  function handleChange(evt) {
    setSearchValue(evt.target.value)
  }

  useEffect(() => {
    if (pathname === "/movies" && localStorage.getItem("inputSearch")) {
      const inputSearch = localStorage.getItem("inputSearch")
      setSearchValue(inputSearch)
    }
  }, [pathname])

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <label className="search__box">
          <input className="search__input-movie"
            onChange={handleChange}
            required
            type='text'
            placeholder="Фильм"
            id="name"
            name="name"
            value={searchValue || ""}
          ></input>
          <button className="search__button" type="submit" aria-label="кнопка поиска">Поиск</button>
        </label>
        {isSpanError &&
          <span className="search-form__error">Нужно ввести ключевое слово</span>
        }
      </form>
      <FilterCheckbox
        handleChange={handleChangeCheckbox}
        isCheckboxChecked={isCheckboxChecked}
      />
      <div className="search__border"></div>
    </section>
  );
}

export default SearchForm;