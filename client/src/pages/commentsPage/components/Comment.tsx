import React, { useRef, useState } from "react";
import { Avatar } from "../../../components";
import { CommentData, AdditionalData } from "./Comments.props";
import { formatDate } from "./../../../utils/helpers";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useAppDispatch } from "../../../store/createStore";
import { editComment, removeComment } from "./../../../store/comment";
import { Link } from "react-router-dom";
import localStorageService from "./../../../services/localStorageService";
import { CommentEdit } from "./CommentEdit";
import { CommentLikeBox } from "./CommentLikeBox";
export interface Nested {
  nested?: true;
}
export const Comment = ({
  _id,
  user,
  reply,
  name,
  content,
  createdAt,
  nested,
  liked,
  likes,
  currentUserId,
}: CommentData & AdditionalData) => {
  const dispatch = useAppDispatch();
  const onDelete = (commentId: string) => {
    dispatch(removeComment(commentId));
  };
  const userId = localStorageService.getUserId();

  const [data, setData] = useState<string>(content);
  const [edit, setEdit] = useState<boolean>(false);
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
    <div className="comment">
      <div className="comment__avatar">
        <Avatar url={user.image} size={nested ? "S" : "M"} />
      </div>
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
          <h3 className="comment__user">{user.name}</h3>
          <div className="comment__text">
            {nested && name && <Link to={`/account/${user._id}`}>@{name}</Link>}
            <p>{content}</p>
            <CommentLikeBox
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
