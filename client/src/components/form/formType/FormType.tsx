import React from "react";
import { FormTypeProps } from "./FormTypes.props";

export const FormType = ({ setForm, type }: FormTypeProps) => {
  return (
    <div className="form-type">
      <button
        onClick={setForm}
        className={"form-type__btn" + (type === "login" ? " active" : "")}
      >
        Sign In
      </button>
      <button
        onClick={setForm}
        className={"form-type__btn" + (type === "register" ? " active" : "")}
      >
        Sign Up
      </button>
    </div>
  );
};
