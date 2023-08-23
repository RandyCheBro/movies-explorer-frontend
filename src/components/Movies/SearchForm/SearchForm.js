import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm() {
  return (
    <section className="search">
      <form className="search-form">
        <label className="search__box">
          <input className="search__input-movie" type='text' placeholder="Фильм"></input>
          <button className="search__button">Поиск</button>
        </label>
      </form>
      <FilterCheckbox />
      <div className="search__border"></div>
    </section>
  );
}

export default SearchForm;