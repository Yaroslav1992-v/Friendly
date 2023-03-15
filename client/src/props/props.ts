import { ObjectFit } from "../hoc/hooks/usePosts/usePost.types";

export interface Errors {
  email?: string;
  password?: string;
  name?: string;
  terms?: string;
  image?: string;
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
  followers: [];
  following: [];
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
export interface createCommentData {
  content: string;
  userId: { _id: string; image?: string; name: string };
  postId: string;
  parentid?: string;
}
export interface Comment extends createCommentData {
  createdAt: Date;
  likes?: string[];
}
