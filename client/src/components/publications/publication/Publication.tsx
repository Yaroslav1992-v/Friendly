import React, { useState } from "react";
import { PostWithLikes } from "../../../hoc/hooks/usePosts/usePost.types";
import { checkIfLiked } from "../../../utils/helpers";
import {
  PublicationActions,
  PublicationHead,
  PublicationImage,
} from "./components";
import { Picture } from "./components/Publication.props";
import { PublicationContent } from "./components/PublicationContent";

export const Publication = (post: PostWithLikes) => {
  const { name, image, _id: userId } = post.userId;
  const { images, currentUser, likes, _id, comments, text, createdAt } = post;
  const [picture, setPicture] = useState<Picture>(images[0]);
  const [slide, setSlide] = useState<number>(0);
  const handleImage = (num: number) => {
    setPicture({ url: images[num].url, objectFit: images[num].objectFit });
    setSlide(num);
  };

  return (
    <article className="publication">
      <PublicationHead userId={userId} name={name} avatar={image} />
      <PublicationImage
        fromToWhere={
          images.length > 1 ? { from: slide + 1, to: images.length } : undefined
        }
        objectFit={picture.objectFit}
        url={picture.url}
      />
      <PublicationActions
        liked={checkIfLiked(_id, currentUser, likes)}
        userId={currentUser}
        postId={_id}
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
        postId={_id}
        likes={likes.length}
        comments={comments.length}
        text={text}
        date={createdAt}
      />
    </article>
  );
};
