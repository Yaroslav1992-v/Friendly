import { ReactNode } from "react";
export interface NotUserImageProps {
  firstUser: string;
  secondUser: string;
}
export interface NotInfo {
  link: string;
  content: string;
  data?: ReactNode;
}
