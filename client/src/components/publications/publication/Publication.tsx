import React, { useState } from "react";
import { Post } from "../../../hoc/hooks/usePosts/usePost.types";
import {
  PublicationActions,
  PublicationHead,
  PublicationImage,
} from "./components";
import { Picture } from "./components/Publication.props";
import { PublicationContent } from "./components/PublicationContent";

export const Publication = (post: Post) => {
  const { name, image } = post.userId;
  const { images } = post;
  const [picture, setPicture] = useState<Picture>(images[0]);
  const [slide, setSlide] = useState<number>(0);
  const handleImage = (num: number) => {
    setPicture({ url: images[num].url, objectFit: images[num].objectFit });
    setSlide(num);
  };
  return (
    <article className="publication">
      <PublicationHead name={name} avatar={image} />
      <PublicationImage
        fromToWhere={
          images.length > 1 ? { from: slide + 1, to: images.length } : undefined
        }
        objectFit={picture.objectFit}
        url={picture.url}
      />
      <PublicationActions
        slider={
          images.length > 1
            ? {
                data: { from: slide, to: images.length },
                slider: handleImage,
              }
            : undefined
        }
      />
      <PublicationContent
        likes={365}
        comments={2}
        text={post.text}
        date={post.createdAt}
      />
    </article>
  );
};
