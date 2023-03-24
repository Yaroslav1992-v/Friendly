import React from "react";
import { getReadableDate } from "../../../utils/helpers";
import { MessageBoxProps } from "./Chats.props";
import { Message } from "./Message";
import { formatTime } from "./../../../utils/helpers";

export const MessageBox = ({ messages, currentUserId }: MessageBoxProps) => {
  // const messages = [
  //   {
  //     date: "Yesterday",
  //     messages: [
  //       {
  //         text: "I like living here, it's not too big and it has great weather all year long, perfect!",
  //         userId: userId,
  //         time: "09:18",
  //       },
  //       {
  //         text: "Sure!",
  //         userId: 1,
  //         time: "09:18",
  //       },
  //       {
  //         text: "There is a Rose Parade in August!",
  //         userId: 1,
  //         time: "09:18",
  //       },
  //     ],
  //   },

  //   {
  //     date: "Today",
  //     messages: [
  //       {
  //         text: "There's a parade too!",
  //         userId: userId,
  //         time: "11:29",
  //       },
  //       {
  //         text: "It has wonderful restaurants and close to the mountains but I'm not ever going to leave",
  //         userId: userId,
  //         time: "11:29",
  //       },
  //       {
  //         text: "Ok it's very easy",
  //         userId: 1,
  //         time: "11:29",
  //       },
  //     ],
  //   },
  // ];
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
        </div>
      ))}
    </div>
  );
};
