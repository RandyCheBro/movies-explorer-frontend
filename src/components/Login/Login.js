import React from "react";
import "./Login.css";
import GeneralForm from "../GeneralForm/GeneralForm";
import { useForm } from "../../hooks/useForm";


function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useForm()

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    })
  }
  return (
    <main className="login">
      <GeneralForm
        isValid={isValid}
        errors={errors}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
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