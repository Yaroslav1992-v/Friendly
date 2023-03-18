import React from "react";
import { LoveIcon } from "../../../components/Icons";
import { Like } from "../../../props/props";
import { useAppDispatch } from "../../../store/createStore";
import { createLike, removeLike } from "../../../store/likes";
import { LikeBoxProps } from "./Comments.props";

export const CommentLikeBox = ({
  likes,
  parentId,
  userId,
  liked,
}: LikeBoxProps) => {
  const dispatch = useAppDispatch();
  const likeComment = () => {
    if (typeof liked === "string") {
      dispatch(removeLike(liked));
    } else {
      const like: Like = {
        parentId,
        author: userId,
        type: "comment",
      };
      dispatch(createLike(like));
    }
  };
  return (
    <div className="comment__likes">
      <button
        onClick={likeComment}
        className={"comment__like " + (liked ? "comment__like-liked" : "")}
      >
        <LoveIcon />
      </button>
      {likes > 0 && <span className="comment__like-numbers">{likes}</span>}
    </div>
  );
};
