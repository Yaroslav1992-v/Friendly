export interface ButtonProps {
  text: string;
  color: "primary" | "white" | "black";
}
export interface ActionBtnProps {
  Icon: JSX.Element;
  action: () => void;
}
