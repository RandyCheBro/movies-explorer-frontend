import React, { useEffect } from "react";
import "./Register.css";
import GeneralForm from "../GeneralForm/GeneralForm";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

function Register({ onRegister, isLoggedIn }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useForm();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  })

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