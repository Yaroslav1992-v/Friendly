import React from "react";
import { ActionBtn, PostTextArea } from "../../../components";
import { XIcon } from "../../../components/Icons";
import { CommentEditProps } from "./Comments.props";
export const CommentEdit = ({
  data,
  textRef,
  handleEdit,
  handleText,
  onEdit,
  _id,
}: CommentEditProps) => {
  return (
    <div className="comment__edit">
      <PostTextArea value={data} textRef={textRef} onChange={handleText} />
      <ActionBtn action={handleEdit} Icon={<XIcon />} />
      <button onClick={() => onEdit(_id)} className="comment__save">
        Save
      </button>
    </div>
  );
};
