import { ReactNode } from "react";

export interface ContainerProps {
  name: "container" | "app-container";
  background: "primary" | "white" | "black" | "grey";
  children: ReactNode;
}
