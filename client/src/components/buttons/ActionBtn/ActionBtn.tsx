import React from "react";
import { Link } from "react-router-dom";
import { ActionBtnProps } from "./ActionBtn.props";

export const ActionBtn = ({ Icon, action }: ActionBtnProps) => {
  return (
    <>
      {"to" in action ? (
        <Link
          className="action-btn"
          to={`${action.to}`}
          state={{ from: action.from }}
        >
          {Icon}
        </Link>
      ) : (
        <button onClick={action} className="action-btn">
          {Icon}
        </button>
      )}
    </>
  );
};
