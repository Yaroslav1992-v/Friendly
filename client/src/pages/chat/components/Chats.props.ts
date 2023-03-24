import { Chat, Message, UserMinData } from "../../../props/props";

export interface ChatPreviewProps {
  chat: Chat;
  user: Omit<UserMinData, "email">;
}
export interface MessageProps {
  text: string;
  date: string;
  userId: string;
  currentUserId: string;
}
export interface MessageBoxProps {
  messages: Message[][];
  currentUserId: string;
}
