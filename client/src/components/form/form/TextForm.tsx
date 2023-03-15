import React from "react";
import { TextArea } from "../TextArea/TextArea";
import { TextFormProps } from "./form.props";
import { SendIcon } from "./../../Icons/SendIcon";

export const TextForm = ({
  reply,
  textRef,
  handleSubmit,
  handleText,
  disabled,
  placeholder,
  value,
}: TextFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="text-form">
      <TextArea
        reply={reply}
        value={value}
        textRef={textRef}
        onChange={handleText}
        placeholder={placeholder}
      />
      <button disabled={disabled} type="submit" className="text-form__submit">
        <SendIcon />
      </button>
    </form>
  );
};
