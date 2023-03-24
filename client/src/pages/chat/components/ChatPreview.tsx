import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../../components";
import { ChatPreviewProps } from "./Chats.props";
import { formatDate } from "./../../../utils/helpers";

export const ChatPreview = ({ user, chat }: ChatPreviewProps) => {
  const { _id: chatId, lastMessage } = chat;
  return (
    <Link to={`${chatId}`} className="chats__preview">
      <div className="chats__image">
        <Avatar url={user.image} size="M" />
      </div>
      <div className="chats__content">
        <div className="chats__data">
          <h3 className="chats__user">{user.name}</h3>
          <p className="chats__last-message">{lastMessage!.message}</p>
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
