import React from "react";
import "./Register.css";
import GeneralForm from "../GeneralForm/GeneralForm";

function Register() {

  return (
    <main className="register">
      <GeneralForm
        title="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        linkSpanText="Уже зарегистрированы?"
        linkText="Войти"
        linkRoute="/signin"
      />
    </main>
  );
}

export default Register;