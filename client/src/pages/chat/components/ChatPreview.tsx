import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typing } from "../../../components";
import { ChatPreviewProps } from "./Chats.props";
import { formatDate } from "./../../../utils/helpers";
import { UseApp } from "../../../hoc/AppLoader";
import { useSelector } from "react-redux";
import { countNotificationsType } from "../../../store/notificaton";

export const ChatPreview = ({ user, chat }: ChatPreviewProps) => {
  const { _id: chatId, lastMessage } = chat;
  const { socket } = UseApp();
  const cutText = () => {
    if (lastMessage!.message.length > 40) {
      return lastMessage!.message.slice(0, 40) + "...";
    } else return lastMessage!.message;
  };
  const [typing, setTyping] = useState<boolean>(false);
  const unreadCount = useSelector(countNotificationsType(chatId, "message"));
  useEffect(() => {
    // socket.on("new-message", (newMessage) => {
    //   dispatch(recivedMessage(newMessage));
    // });

    socket.on("typing", (id) => {
      if (chatId === id) {
        setTyping(true);
      }
    });
    socket.on("stop-typing", (id) => {
      if (chatId === id) {
        setTyping(false);
      }
    });
  }, []);
  return (
    <Link
      to={`${chatId}`}
      className={"chats__preview" + (unreadCount > 0 ? " unread" : "")}
    >
      <div className="chats__image">
        <Avatar url={user.image} size="M" />
      </div>
      <div className="chats__content">
        <div className="chats__data">
          <h3 className="chats__user">{user.name}</h3>
          {typing ? (
            <Typing />
          ) : (
            <p className="chats__last-message">{cutText()}</p>
          )}
        </div>
        <div className="chats__info">
          <div className="chats__date">
            {formatDate(lastMessage!.createdAt)}
          </div>
          {unreadCount > 0 && (
            <div className="chats__unread">{unreadCount}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
