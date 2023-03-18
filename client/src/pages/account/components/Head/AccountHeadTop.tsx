import React from "react";
import { useParams } from "react-router-dom";

import { Avatar } from "../../../../components";
import {
  AddPostIcon,
  ChatIcon,
  EditIcon,
  LoveIcon,
} from "../../../../components/Icons";
import { AccountHeadTopProps } from "../../Account.props";
import { AccountHeadAction } from "./AccountHeadAction";
import { Follow } from "../../../../props/props";
import { useAppDispatch } from "../../../../store/createStore";
import { followUser, unfollowUser } from "../../../../store/user";
import {} from "./../../../../store/user";
export const AccountHeadTop = ({
  url,
  isFollowing,
  id,
  currentUserId,
}: AccountHeadTopProps) => {
  const dispatch = useAppDispatch();

  const handleFollow = () => {
    const follow: Follow = {
      followingId: id as string,
      followerId: currentUserId as string,
    };
    if (isFollowing) {
      dispatch(unfollowUser(follow));
    } else {
      dispatch(followUser(follow));
    }
  };

  return (
    <div className="account__head-top">
      {currentUserId === id ? (
        <AccountHeadAction
          name="Add Post"
          Icon={<AddPostIcon />}
          action={"/p/addPost"}
        />
      ) : (
        <AccountHeadAction
          action={"/chat"}
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
  );
};
