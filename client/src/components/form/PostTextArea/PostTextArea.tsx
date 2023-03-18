import React from "react";
import { PostTextAreaProps } from "./PostTextArea.props";

export const PostTextArea = ({
  value,
  textRef,
  onChange,
}: PostTextAreaProps) => {
  return (
    <div className="postTextArea">
      <textarea
        value={value}
        onChange={onChange}
        ref={textRef}
        className="postTextArea__textArea"
      />
    </div>
  );
};
