import { ObjectFit } from "../hoc/hooks/usePosts/usePost.types";
import { Message } from "./../pages/chat/components/Message";

export interface Errors {
  email?: string;
  password?: string;
  name?: string;
  terms?: string;
  image?: string;
}
export interface UserMinData extends Omit<Errors, "password" | "terms"> {
  name: string;
  _id: string;
}
export interface RegisterData {
  _id?: string;
  email: string;
  password: string;
  name: string;
  image?: File | string;
}
export interface UserData extends Token, UserPlusData {}

export interface UserPlusData {
  followers: string[];
  following: string[];
  image?: string;
}
export interface User extends Omit<RegisterData, "password">, UserPlusData {
  _id: string;
  image?: string;
  status?: string;
}
export interface Token {
  refreshToken: string;
  accessToken: string;
  _id: string;
  expiresIn: number;
}

export interface AuthData {
  email: string;
  password: string;
}
export interface ImgObject {
  objectFit: ObjectFit;
  url: string;
}
export interface PostData {
  images: string[];
  text: string;
  userId: string;
}
export interface Like {
  type: "comment" | "post";
  parentId: string;
  author: string;
}
export interface LikeData extends Like {
  _id: string;
}
export interface Follow {
  followingId: string;
  followerId: string;
}
export interface CreateChatData {
  firstUser: string;
  secondUser: string;
}
export interface Chat {
  _id: string;
  firstUser: Omit<UserMinData, "email">;
  secondUser: Omit<UserMinData, "email">;
  lastMessage?: { createdAt: Date; message: string };
}
export interface CreateMessageData {
  content: string;
  user: string;
  chatId: string;
}
export interface Message extends CreateMessageData {
  _id: string;
  createdAt: Date;
}
