import React from "react";
import { PostTextAreaProps } from "./PostTextArea.props";

export const PostTextArea = ({ textRef, onChange }: PostTextAreaProps) => {
  return (
    <div className="postTextArea">
      <textarea
        onChange={onChange}
        ref={textRef}
        name=""
        id=""
        className="postTextArea__textArea"
      />
    </div>
  );
};
