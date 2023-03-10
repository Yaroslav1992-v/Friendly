import React, { useState } from "react";
import { NavigationProps } from "./Navigation.props";

import { useLocation } from "react-router-dom";
import { FeedIcon, FriendsIcon, NotificationIcon } from "../Icons";
import { Avatar } from "..";
import { useSelector } from "react-redux";
import { getCurrentUserId, getCurrentUserImage } from "./../../store/auth";
import { NavigationItem } from "./NavigationItem";

export const Navigation = () => {
  const { pathname } = useLocation();
  const currentUserId = useSelector(getCurrentUserId());
  const userImage = useSelector(getCurrentUserImage());
  const navigation: NavigationProps[] = [
    {
      navName: "Feed",
      active: pathname === "/",
      Icon: <FeedIcon />,
      to: "/",
    },
    {
      navName: "Friends",
      active: pathname.includes("friends"),
      Icon: <FriendsIcon />,
      to: "/friends",
    },
    {
      navName: "Notifications",
      active: pathname.includes("notifications"),
      Icon: <NotificationIcon />,
      to: "/notifications",
    },
    {
      navName: "Account",
      active: pathname.includes("account"),
      Icon: <Avatar url={userImage ? userImage : ""} size="S" />,
      to: `/account/${currentUserId}`,
    },
  ];
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navigation.map((n, i) => (
          <NavigationItem
            key={i}
            navName={n.navName}
            Icon={n.Icon}
            active={n.active}
            to={n.to}
          />
        ))}
      </ul>
    </nav>
  );
};
