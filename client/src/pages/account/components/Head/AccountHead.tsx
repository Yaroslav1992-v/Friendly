import React from "react";
import { User } from "../../../../props/props";
import { AccountHeadTop } from "./AccountHeadTop";
import { AccountHeadMiddle } from "./AccountHeadMiddle";
import { AccoundHeadBottom } from "./AccoundHeadBottom";
import localStorageService from "./../../../../services/localStorageService";

export const AccountHead = ({ user, post }: { user: User; post: number }) => {
  const userId = localStorageService.getUserId();

  return (
    <div className="account__head">
      <AccountHeadTop
        currentUserId={userId as string}
        isFollowing={user.followers.includes(userId as string)}
        id={user._id}
        url={user.image}
      />
      <AccountHeadMiddle
        name={user.name}
        occupation={user.status || "Full Stack Developer"}
      />
      <AccoundHeadBottom
        followers={user.followers.length}
        following={user.following.length}
        posts={post}
      />
    </div>
  );
};
