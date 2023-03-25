import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typing } from "../../../components";
import { ChatPreviewProps } from "./Chats.props";
import { formatDate } from "./../../../utils/helpers";
import { UseApp } from "../../../hoc/AppLoader";
import { useAppDispatch } from "../../../store/createStore";

export const ChatPreview = ({ user, chat }: ChatPreviewProps) => {
  const { _id: chatId, lastMessage } = chat;
  const { socket } = UseApp();
  const [typing, setTyping] = useState<boolean>(false);
  useEffect(() => {
    // socket.on("new-message", (newMessage) => {
    //   dispatch(recivedMessage(newMessage));
    // });

    socket.on("typing", () => setTyping(true));
    socket.on("stop-typing", () => setTyping(false));
  }, []);
  return (
    <Link to={`${chatId}`} className="chats__preview">
      <div className="chats__image">
        <Avatar url={user.image} size="M" />
      </div>
      <div className="chats__content">
        <div className="chats__data">
          <h3 className="chats__user">{user.name}</h3>
          {typing ? (
            <Typing />
          ) : (
            <p className="chats__last-message">{lastMessage!.message}</p>
          )}
        </div>
        <div className="chats__info">
          <div className="chats__date">
            {formatDate(lastMessage!.createdAt)}
          </div>
          <div className="chats__unread">3</div>
        </div>
      </div>
    </Link>
  );
};
