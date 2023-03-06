import React from "react";
import { Link } from "react-router-dom";
import { NavigationProps } from "./Navigation.props";

export const NavigationItem = ({
  to,
  navName,
  Icon,
  active,
}: NavigationProps) => {
  return (
    <li
      className={
        "navigation__item" + (active ? " navigation__item-active" : "")
      }
    >
      <Link className="navigation__link" to={to}>
        <div className="navigation__icon">{Icon}</div>
        <h3 className="navigation__title">{navName}</h3>
      </Link>
    </li>
  );
};
