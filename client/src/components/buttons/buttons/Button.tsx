import React from "react";
import { Spinner } from "../../spinner/Spinner";

import { ButtonProps } from "./Button.props";

export const Button = ({ text, color, onClick, loading }: ButtonProps) => {
  return (
    <button onClick={onClick} className={` btn btn-${color}`}>
      {!loading ? text : <Spinner />}
    </button>
  );
};
