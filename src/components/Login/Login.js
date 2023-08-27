import React from "react";
import "./Login.css";
import GeneralForm from "../GeneralForm/GeneralForm";

function Login() {

  return (
    <main className="login">
      <GeneralForm
        title="Рады видеть!"
        buttonName="Войти"
        linkSpanText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        linkRoute="/signup"
      />
    </main>
  );
}

export default Login;