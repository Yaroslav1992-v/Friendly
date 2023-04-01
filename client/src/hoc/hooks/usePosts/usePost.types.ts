import { LikeData } from "../../../props/props";

export interface PostData {
  text?: string;
  images: {
    url: string;
    objectFit: ObjectFit;
  }[];
}
export interface Post extends PostData {
  _id: string;
  userId: { _id: string; image: string; name: string };
  comments: string[];
  createdAt: Date;
}
export interface PostWithLikes extends Post {
  currentUser: string;
  likes: LikeData[];
}
export interface Images extends File {
  objectFit: ObjectFit;
}
export interface createPostData {
  userId: string;
  text?: string;
  images: { objectFit: ObjectFit; url: string }[];
}

export type ObjectFit = "cover" | "contain";
export interface PostContextValue {
  images: Images[];
  imagePreviews: string[];
  lookClose: LookClose | null;
  handleLook: (objectFit: ObjectFit, img: string) => void;
  handleImageSize: (name: string) => void;
  handleImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePreviews: (preview: string, num: number) => void;
}
export type LookClose = { objectFit: ObjectFit; img: string };
