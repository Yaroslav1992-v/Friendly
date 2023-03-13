import { ObjectFit } from "../../hoc/hooks/usePosts/usePost.types";

export interface ImagePreviewProps {
  url: string;
  objectFit: ObjectFit;
  goBack: (objectFit: ObjectFit, img: string) => void;
  slide?: {
    slide: (num: number) => void;
    data: { num: number; loc: number };
    arrayLength: number;
  };
  position?: "absolute";
}
