import React from "react";
import { ActionBtn, Dots } from "../../..";
import { useAppDispatch } from "../../../../store/createStore";
import { createLike, removeLike } from "../../../../store/likes";
import { CommentIcon, LikeIcon, ShareIcon } from "../../../Icons";
import { ActionsProps } from "./Publication.props";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "./../../../../store/auth";
import { Like } from "../../../../props/props";

export const PublicationActions = ({
  postId,
  liked,
  slider,
  userId,
}: ActionsProps) => {
  const action = () => {};
  const dispatch = useAppDispatch();
  const likePost = () => {
    if (typeof liked === "string") {
      dispatch(removeLike(liked));
    } else {
      const like: Like = {
        parentId: postId,
        author: userId as string,
        type: "post",
      };
      dispatch(createLike(like));
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
