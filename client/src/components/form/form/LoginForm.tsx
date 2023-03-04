import React, { useRef } from "react";
import { InputField, Button } from "../../index";

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form className="form">
      <div className="form__container">
        <InputField
          error={""}
          placeholder="Email"
          type="text"
          inputRef={emailRef}
        />
        <InputField
          error={""}
          placeholder="Password"
          type="password"
          inputRef={passwordRef}
        />
      </div>
      <Button color="black" text="Sign In" />
    </form>
  );
};
