import React from "react";
import { ButtonProps } from "./Button.props";

export const Button = ({ text, color }: ButtonProps) => {
  return <button className={` btn btn-${color}`}>{text}</button>;
};
