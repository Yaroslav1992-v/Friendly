import { ObjectFit } from "../../../../hoc/hooks/usePosts/usePost.types";

export interface HeadProps {
  name: string;
  avatar?: string;
  userId: string;
  postId: string;
}
export interface ImageProps {
  url: string;
  fromToWhere?: fromToWhere;
  objectFit: ObjectFit;
}
export type Picture = {
  url: string;
  objectFit: ObjectFit;
};

export interface ContentProps {
  likes: number;
  comments: number;
  text?: string;
  date: Date;
  postId: string;
  pathName: string;
}
type fromToWhere = { from: number; to: number };
export interface ActionsProps {
  postId: string;
  slider?: slider;
  liked: string | boolean;
  userId: string;
  author: string;
  postUserId: string;
  pathName: string;
  postImage: string;
}
export type slider = { data: fromToWhere; slider: (num: number) => void };
