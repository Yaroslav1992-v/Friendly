import React, { useEffect, useRef, useState } from "react";
import { PostWithLikes } from "../../../hoc/hooks/usePosts/usePost.types";
import { checkIfLiked } from "../../../utils/helpers";
import {
  PublicationActions,
  PublicationHead,
  PublicationImage,
} from "./components";
import { Picture } from "./components/Publication.props";
import { PublicationContent } from "./components/PublicationContent";
import { useParams } from "react-router-dom";

export const Publication = (post: PostWithLikes) => {
  const { name, image, _id: userId } = post.userId;
  const { images, currentUser, likes, _id, comments, text, createdAt } = post;
  const [picture, setPicture] = useState<Picture>(images[0]);
  const [slide, setSlide] = useState<number>(0);
  const handleImage = (num: number) => {
    setPicture({ url: images[num].url, objectFit: images[num].objectFit });
    setSlide(num);
  };
  const { postId } = useParams();
  const postRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (post._id === postId && postRef.current) {
      const topOffset = postRef.current.offsetTop - 50;
      postRef.current.scrollIntoView({
        behavior: "smooth",
      });
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, []);
  return (
    <article id={post._id} ref={postRef} className="publication">
      <PublicationHead
        postId={post._id}
        userId={userId}
        name={name}
        avatar={image}
      />
      <PublicationImage
        fromToWhere={
          images.length > 1 ? { from: slide + 1, to: images.length } : undefined
        }
        objectFit={picture.objectFit}
        url={picture.url}
      />
      <PublicationActions
        postImage={post.images[0].url}
        liked={checkIfLiked(_id, currentUser, likes)}
        author={userId}
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
