import React, { useEffect, useRef } from "react";
import { getReadableDate } from "../../../utils/helpers";
import { MessageBoxProps } from "./Chats.props";
import { Message } from "./Message";
import { formatTime } from "./../../../utils/helpers";

export const MessageBox = ({ messages, currentUserId }: MessageBoxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className="chat__messageBox">
      {messages.map((d, i) => (
        <div key={i} className="chat__messages">
          <div className="chat__messages-date">
            {getReadableDate(d[0].createdAt)}
          </div>
          <ul className="chat__messages-list">
            {d.map((m) => (
              <li
                key={m._id}
                className={
                  "chat__messages-item" +
                  (currentUserId === m.user ? " chat__messages-item-user" : "")
                }
              >
                {
                  <Message
                    text={m.content}
                    date={formatTime(m.createdAt)}
                    userId={m.user}
                    currentUserId={currentUserId}
                  />
                }
              </li>
            ))}
          </ul>
          <div ref={bottomRef}></div>
        </div>
      ))}
    </div>
  );
};
