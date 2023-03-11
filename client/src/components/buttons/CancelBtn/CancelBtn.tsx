import React from "react";
import { Link } from "react-router-dom";
import { CancelBtnProps } from "./CancelBtn.props";

export const CancelBtn = ({ props }: CancelBtnProps) => {
  return (
    <>
      {"to" in props ? (
        <Link className="cancel-btn" to={props.to}>
          Cancel
        </Link>
      ) : (
        <button onClick={props} className="cancel-btn">
          Cancel
        </button>
      )}
    </>
  );
};
