import React from "react";
import "./Register.css";
import GeneralForm from "../GeneralForm/GeneralForm";
import { useForm } from "../../hooks/useForm";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name
    })
  }

  return (
    <main className="register">
      <GeneralForm
        isValid={isValid}
        errors={errors}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
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