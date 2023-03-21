import React, { useEffect, useState } from "react";
import {
  Container,
  FormType,
  Logo,
  RegisterForm,
  LoginForm,
} from "../../components";

type formType = "login" | "register";

export const StartPage = () => {
  const [formType, setFormType] = useState<formType>("login");
  const [showForms, setShowForms] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShowForms(true);
    }, 1000);
  }, []);
  const handleFormType = () => {
    setFormType((prevState) => (prevState === "login" ? "register" : "login"));
  };
  return (
    <section className="start">
      <Container name="app-container" background="primary">
        <div className="start__container">
          <Logo size={!showForms ? "x-large" : "large"} />
          {showForms && <FormType setForm={handleFormType} type={formType} />}
          {formType === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </Container>
    </section>
  );
};
