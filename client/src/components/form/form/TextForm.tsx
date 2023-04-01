import React, { useState } from "react";
import { TextArea } from "../TextArea/TextArea";
import { TextFormProps } from "./form.props";
import { SendIcon } from "./../../Icons/SendIcon";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
export const TextForm = ({
  reply,
  textRef,
  handleSubmit,
  handleEmoji,
  handleText,
  disabled,
  placeholder,
  value,
}: TextFormProps) => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const togglePickerVisibility = (e: any) => {
    e.preventDefault();
    setPickerVisibility(!isPickerVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="text-form">
      {isPickerVisible && (
        <Picker
          data={data}
          onEmojiSelect={(emoji: { native: string }) => {
            handleEmoji(emoji.native);
            setPickerVisibility(false);
          }}
        />
      )}
      <div className="text-form__container">
        <button onClick={togglePickerVisibility}>😀</button>
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
      </div>
    </form>
  );
};
