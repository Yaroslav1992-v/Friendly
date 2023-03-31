import React from "react";
import { LoveIcon } from "../../../components/Icons";
import { UseApp } from "../../../hoc/AppLoader";
import {
  createNotificationData,
  Like,
  NotificationType,
} from "../../../props/props";
import { useAppDispatch } from "../../../store/createStore";
import { createLike, removeLike } from "../../../store/likes";
import {
  createNotification,
  removeNotificationsByType,
} from "../../../store/notificaton";
import { LikeBoxProps } from "./Comments.props";

export const CommentLikeBox = ({
  likes,
  parentId,
  comment,
  userId,
  liked,
}: LikeBoxProps) => {
  const dispatch = useAppDispatch();
  const { socket } = UseApp();
  const likeComment = async () => {
    if (typeof liked === "string") {
      dispatch(removeLike(liked));
      dispatch(
        removeNotificationsByType(
          comment._id,
          NotificationType.CommentLike,
          userId
        )
      );
    } else {
      const like: Like = {
        parentId,
        author: userId,
        type: "comment",
      };
      dispatch(createLike(like));
      if (comment.user._id !== userId) {
        const notif: createNotificationData = {
          author: userId,
          content: comment.content,
          type: NotificationType.CommentLike,
          reciever: comment.user._id,
          typeId: comment._id,
          post: {
            id: comment.postId,
          },
        };
        const notification = await dispatch(createNotification(notif));
        socket.emit("notify", notification);
      }
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
