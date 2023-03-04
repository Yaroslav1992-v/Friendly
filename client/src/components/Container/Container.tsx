import React from "react";
import { ContainerProps } from "./Container.props";
export const Container = ({ name, children, background }: ContainerProps) => {
  return <div className={name + ` ${name}-${background}`}>{children} </div>;
};
