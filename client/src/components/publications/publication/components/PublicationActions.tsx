import React from "react";
import { ActionBtn, Dots } from "../../..";
import { useAppDispatch } from "../../../../store/createStore";
import { createLike, removeLike } from "../../../../store/likes";
import { CommentIcon, LikeIcon, ShareIcon } from "../../../Icons";
import { ActionsProps } from "./Publication.props";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "./../../../../store/auth";
import {
  createNotificationData,
  Like,
  NotificationType,
} from "../../../../props/props";
import { UseApp } from "../../../../hoc/AppLoader";
import {
  createNotification,
  removeNotificationsByType,
} from "../../../../store/notificaton";

export const PublicationActions = ({
  postId,
  liked,
  postImage,
  slider,
  author,
  userId,
}: ActionsProps) => {
  const action = () => {};
  const dispatch = useAppDispatch();
  const { socket } = UseApp();
  const likePost = async () => {
    if (typeof liked === "string") {
      dispatch(removeLike(liked));
      dispatch(
        removeNotificationsByType(postId, NotificationType.PostLike, userId)
      );
    } else {
      const like: Like = {
        parentId: postId,
        author: userId as string,
        type: "post",
      };
      dispatch(createLike(like));

      const notif: createNotificationData = {
        author: userId,
        content: postImage,
        type: NotificationType.PostLike,
        reciever: author,
        typeId: postId,
      };
      const notification = await dispatch(createNotification(notif));
      socket.emit("notify", notification);
    }
    //  }
  };
  return (
    <div className="publication__nav">
      <div
        className={
          "publication__actions" + (liked ? " publication__actions-liked" : "")
        }
      >
        <ActionBtn action={likePost} Icon={<LikeIcon />} />
        <ActionBtn
          action={{ to: `p/${postId}/comments`, from: "/" }}
          Icon={<CommentIcon />}
        />
        <ActionBtn action={action} Icon={<ShareIcon />} />
      </div>
      {slider && (
        <Dots
          slider={slider.slider}
          current={slider.data.from}
          total={slider.data.to}
        />
      )}
    </div>
  );
};
