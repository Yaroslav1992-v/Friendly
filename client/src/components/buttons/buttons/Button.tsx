import React from "react";
import { ButtonProps } from "./Button.props";

export const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={` btn btn-${color}`}>
      {text}
    </button>
  );
};
