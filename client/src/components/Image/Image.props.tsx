import { ObjectFit } from "../../hoc/hooks/usePosts/usePost.types";

export interface ImageProps {
  url: string;
  lookClose: (objectFit: ObjectFit, url: string) => void;
  place: number;
  removePreview: (preview: string, num: number) => void;
  changeFit: (name: string) => void;
  objectFit: ObjectFit;
  name: string;
}
