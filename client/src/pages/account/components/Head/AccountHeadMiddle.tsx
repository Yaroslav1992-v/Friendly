import React from "react";
import { AccoundHeadMiddleProps } from "../../Account.props";

export const AccountHeadMiddle = ({
  name,
  occupation,
}: AccoundHeadMiddleProps) => {
  return (
    <div className="account__head-middle">
      <h1 className="account__head-title">{name}</h1>
      {occupation && <span className="account__head-info">{occupation}</span>}
    </div>
  );
};
