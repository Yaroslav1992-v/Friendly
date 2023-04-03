import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "../../../components";

import { formatDate } from "./../../../utils/helpers";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useAppDispatch } from "../../../store/createStore";
import { editComment, removeComment } from "./../../../store/comment";
import { Link, useLocation, useParams } from "react-router-dom";
import localStorageService from "./../../../services/localStorageService";
import { CommentEdit } from "./CommentEdit";
import { CommentLikeBox } from "./CommentLikeBox";
import { removeNotificationsByType } from "../../../store/notificaton";
import { CommentProps } from "./Comments.props";
import { NotificationType } from "../../../props/props";
export interface Nested {
  nested?: true;
}
export const Comment = ({
  comment,
  reply,
  name,
  nested,
  liked,
  likes,
  currentUserId,
}: CommentProps) => {
  const dispatch = useAppDispatch();
  const { commentId } = useParams();
  const { pathname } = useLocation();

  const onDelete = (commentId: string) => {
    dispatch(removeComment(commentId));

    const typeId = comment.reply ? comment._id : comment.postId;
    const type = comment.reply
      ? NotificationType.CommentReply
      : NotificationType.Comment;

    if (typeId && type) {
      dispatch(removeNotificationsByType(typeId, type, currentUserId));
    }
  };
  const userId = localStorageService.getUserId();
  const { content, user, createdAt, _id } = comment;
  const [data, setData] = useState<string>(content);
  const [edit, setEdit] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (comment._id === commentId && commentRef.current) {
      const topOffset = commentRef.current.offsetTop - 100;
      commentRef.current.scrollIntoView({
        behavior: "smooth",
      });
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, []);
  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const onEdit = (commentId: string) => {
    dispatch(editComment(commentId, data));
    setEdit(false);
  };
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleText = () => {
    setData(textRef.current?.value || "");
    const height = textRef.current!.scrollHeight;
    textRef.current!.style.height = height + "px";
  };
  return (
    <div
      id={comment._id}
      className={
        "comment " + (commentId === comment._id ? "comment__reading" : "")
      }
      ref={commentRef}
    >
      <Link
        state={{ from: pathname }}
        to={`/account/${comment.user._id}`}
        className="comment__avatar"
      >
        <Avatar url={user.image} size={nested ? "S" : "M"} />
      </Link>
      {edit ? (
        <CommentEdit
          data={data}
          textRef={textRef}
          handleText={handleText}
          handleEdit={handleEdit}
          onEdit={onEdit}
          _id={_id}
        />
      ) : (
        <div className="comment__container">
          <Link
            to={`/account/${comment.user._id}`}
            state={{ from: pathname }}
            className="comment__user"
          >
            {user.name}
          </Link>
          <div className="comment__text">
            {nested && name && (
              <Link state={{ from: pathname }} to={`/account/${user._id}`}>
                @{name}
              </Link>
            )}
            <p>{content}</p>
            <CommentLikeBox
              comment={comment}
              liked={liked}
              parentId={_id}
              likes={likes}
              userId={currentUserId}
            />
          </div>
          <div className="comment__bottom">
            <button
              onClick={() => reply?.onReply(user.name, user._id, _id!)}
              className="comment__reply"
            >
              Reply
            </button>
            <span className="comment__date">{formatDate(createdAt)}</span>
            {userId === user._id && (
              <>
                <button
                  onClick={() => onDelete(_id)}
                  className="comment__action"
                >
                  <AiFillDelete />
                </button>
                <button onClick={handleEdit} className="comment__action">
                  <MdModeEditOutline />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
