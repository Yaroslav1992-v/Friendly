import React from "react";
import { DotsBtnProps } from "./DotsBtn.props";

export const DotsBtn = ({ action }: DotsBtnProps) => {
  return (
    <button onClick={action ? action : () => {}} className="dots-btn">
      {" "}
    </button>
  );
};
