import React from "react";
import { TopNavigationProps } from "./Navigation.props";

export const TopNavigation = ({
  firstElement,
  title,
  secondElement,
}: TopNavigationProps) => {
  return (
    <div className="top-navigation">
      {firstElement && firstElement}
      <h1 className="top-navigation__title">{title}</h1>
      {secondElement && secondElement}
    </div>
  );
};
