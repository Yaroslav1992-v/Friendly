import React from "react";
import { ArrowIcon } from "./ArrowIcon";
import { ArrowBtnProps } from "./ArrowBtn.props";

export const ArrowButton = ({ side, click }: ArrowBtnProps) => {
  return (
    <button onClick={click} className={`arrow-btn arrow-btn__${side}`}>
      <ArrowIcon />
    </button>
  );
};
