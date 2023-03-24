import React from "react";
import { MessageProps } from "./Chats.props";

export const Message = ({
  text,
  userId,
  date,
  currentUserId,
}: MessageProps) => {
  return (
    <div
      className={
        "chat__message " +
        (userId === currentUserId ? "chat__message-user" : "")
      }
    >
      <div className="chat__message-content">
        <p>{text}</p>
      </div>
      <div className="chat__message-date">{date}</div>
    </div>
  );
};
