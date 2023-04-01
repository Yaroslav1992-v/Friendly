import { User } from "../../../props/props";

export interface TextFormProps {
  placeholder: string;
  reply?: string;
  value: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleText: () => void;
  handleEmoji: (emoji: string) => void;
  disabled: boolean;
  textRef: React.RefObject<HTMLTextAreaElement>;
}
export interface editFormProps {
  user: User;
}
