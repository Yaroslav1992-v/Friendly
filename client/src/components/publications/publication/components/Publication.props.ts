import { ObjectFit } from "../../../../hoc/hooks/usePosts/usePost.types";

export interface HeadProps {
  name: string;
  avatar?: string;
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
}
type fromToWhere = { from: number; to: number };
export type slider = {
  slider?: { data: fromToWhere; slider: (num: number) => void };
};
