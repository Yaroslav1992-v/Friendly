import React from "react";
import { TextAreaProps } from "./TextAreaProps";

export const TextArea = ({
  textRef,
  placeholder,
  onChange,
  reply,
  value,
}: TextAreaProps) => {
  const setValue = (): string => {
    if (reply) {
      if (value.includes(reply)) return value;
      else return "@" + reply + " " + value;
    } else return value;
  };
  return (
    <div className="text-area">
      <textarea
        ref={textRef}
        value={setValue()}
        onChange={onChange}
        placeholder={placeholder}
        className="text-area__text-area"
      />
    </div>
  );
};
