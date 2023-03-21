import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "..";
import { Follow } from "../../props/props";

import { useAppDispatch } from "../../store/createStore";
import { unfollowUser, followUser } from "../../store/user";
import { AdditionalUsersData, MinUser } from "./Users.props";

export const User = ({
  name,
  image,
  _id,
  isFollowing,
  currentUser,
}: MinUser & AdditionalUsersData) => {
  const dispatch = useAppDispatch();

  const handleFollow = () => {
    const follow: Follow = {
      followingId: _id,
      followerId: currentUser._id,
    };
    if (isFollowing) {
      dispatch(unfollowUser(follow, currentUser));
    } else {
      dispatch(followUser(follow, currentUser));
    }
  };
  return (
    <div className="users__user">
      <Link to={`/account/${_id}`} className="users__link">
        <div className="users__img">
          <Avatar size="M" url={image} />
        </div>
        <h4 className="users__name">{name}</h4>
      </Link>
      <Button
        onClick={handleFollow}
        text={isFollowing ? "Following" : "Follow"}
        color={isFollowing ? "white" : "primary"}
      />
    </div>
  );
};
