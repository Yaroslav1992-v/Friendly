import React, { useRef, useState } from "react";
import { signIn } from "../../../store/auth";
import { useAppDispatch } from "../../../store/createStore";
import { InputField, Button } from "../../index";
import { useSelector } from "react-redux";
import { getAuthError } from "./../../../store/auth";
import { Errors } from "./../../../props/props";
export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<Errors>();
  const authError = useSelector(getAuthError());
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current!.value) {
      setError({ email: "You Need Email To Login" });
      return;
    }
    if (!passwordRef.current!.value) {
      setError({ password: "You Need Password To Login" });
      return;
    }
    const userData = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    dispatch(signIn(userData));
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <InputField
          error={error?.email}
          placeholder="Email"
          type="text"
          inputRef={emailRef}
        />
        <InputField
          error={error?.password}
          placeholder="Password"
          type="password"
          inputRef={passwordRef}
        />
      </div>
      {authError && <p className="input__error">{authError}</p>}
      <Button color="black" text="Sign In" />
    </form>
  );
};
