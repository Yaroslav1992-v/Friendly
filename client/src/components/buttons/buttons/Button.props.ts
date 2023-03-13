export interface ButtonProps {
  text: string;
  color: "primary" | "white" | "black";
  onClick?: () => void;
}
