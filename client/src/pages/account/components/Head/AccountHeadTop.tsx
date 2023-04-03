import React from "react";

import { Avatar } from "../../../../components";
import {
  AddPostIcon,
  ChatIcon,
  EditIcon,
  LoveIcon,
} from "../../../../components/Icons";
import { AccountHeadTopProps } from "../../Account.props";
import { AccountHeadAction } from "./AccountHeadAction";
import {
  CreateChatData,
  createNotificationData,
  Follow,
  NotificationType,
} from "../../../../props/props";
import { useAppDispatch } from "../../../../store/createStore";
import { followUser, unfollowUser } from "../../../../store/user";
import {} from "./../../../../store/user";
import { UseApp } from "../../../../hoc/AppLoader";
import {
  createNotification,
  removeNotificationsByType,
} from "../../../../store/notificaton";
import { createChat } from "../../../../store/chats";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { logOut } from "../../../../store/auth";
export const AccountHeadTop = ({
  url,
  isFollowing,
  id,
  currentUserId,
}: AccountHeadTopProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { socket } = UseApp();
  const handleCreateChat = () => {
    const chat: CreateChatData = {
      firstUser: currentUserId as string,
      secondUser: id,
    };
    dispatch(createChat(chat, navigate));
  };
  const handleFollow = async () => {
    const follow: Follow = {
      followingId: id as string,
      followerId: currentUserId as string,
    };
    if (isFollowing) {
      dispatch(unfollowUser(follow));
      dispatch(
        removeNotificationsByType(
          currentUserId,
          NotificationType.Follow,
          currentUserId
        )
      );
    } else {
      dispatch(followUser(follow));
      const notif: createNotificationData = {
        author: currentUserId,
        content: "followed you",
        type: NotificationType.Follow,
        reciever: id,
        typeId: currentUserId,
      };
      const notification = await dispatch(createNotification(notif));
      socket.emit("notify", notification);
    }
  };
  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="account__head-top">
      <div className="account__head-top-box">
        {currentUserId === id ? (
          <AccountHeadAction
            name="Add Post"
            Icon={<AddPostIcon />}
            action={"/addPost"}
          />
        ) : (
          <AccountHeadAction
            action={handleCreateChat}
            Icon={<ChatIcon />}
            name="Message"
          />
        )}

        <Avatar size="XL" url={url} />
        {currentUserId === id ? (
          <AccountHeadAction
            action={`/account/${id}/edit`}
            Icon={<EditIcon />}
            name="Edit"
          />
        ) : (
          <AccountHeadAction
            action={handleFollow}
            Icon={<LoveIcon />}
            name={isFollowing ? "Unfollow" : "Follow"}
          />
        )}
      </div>
      {currentUserId === id && (
        <div className="account__head-top-logout">
          <AccountHeadAction
            action={handleLogout}
            Icon={<AiOutlineLogout />}
            name="LogOut"
          />
        </div>
      )}
    </div>
  );
};
