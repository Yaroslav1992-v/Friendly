import React from "react";
import { Avatar } from "../../../components";
import { CommentData } from "./Comments.props";
import { formatDate } from "./../../../utils/helpers";

export const Comment = ({
  _id,
  user,
  reply,
  content,
  createdAt,
}: CommentData) => {
  return (
    <div className="comment">
      <div className="comment__avatar">
        <Avatar url={user.image} size={reply?.parentId ? "S" : "M"} />
      </div>
      <div className="comment__container">
        <h3 className="comment__user">{user.name}</h3>
        <div className="comment__text">
          <p>{content}</p>
        </div>
        <div className="comment__bottom">
          <button
            onClick={() => reply?.onReply(user.name, user._id, _id!)}
            className="comment__reply"
          >
            Reply
          </button>
          <span className="comment__date">{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
