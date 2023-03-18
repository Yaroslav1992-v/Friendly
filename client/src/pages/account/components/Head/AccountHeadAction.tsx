import React from "react";
import { Link } from "react-router-dom";
import { AccountAction } from "../../Account.props";

export const AccountHeadAction = ({ Icon, name, action }: AccountAction) => {
  console.log(name);
  return (
    <div className="account__head-action">
      {typeof action === "string" ? (
        <Link className="account__head-btn" to={action}>
          <div className="account__head-icon">{Icon}</div>
          <span className="account__head-text">{name}</span>
        </Link>
      ) : (
        <button
          onClick={action}
          className={
            "account__head-btn " +
            (name === "Follow" ? `account__head-btn-follow` : "")
          }
        >
          <div className="account__head-icon">{Icon}</div>
          <span className="account__head-text">{name}</span>
        </button>
      )}
    </div>
  );
};
