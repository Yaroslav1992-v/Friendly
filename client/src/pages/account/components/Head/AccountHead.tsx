import React from "react";
import { User } from "../../../../props/props";
import { AccountHeadTop } from "./AccountHeadTop";
import { AccountHeadMiddle } from "./AccountHeadMiddle";
import { AccoundHeadBottom } from "./AccoundHeadBottom";

export const AccountHead = (user: User) => {
  return (
    <div className="account__head">
      <AccountHeadTop id={user._id} url={user.image} />
      <AccountHeadMiddle
        name={user.name}
        occupation={user.status || "Full Stack Developer"}
      />
      <AccoundHeadBottom followers={72} following={65} posts={386} />
    </div>
  );
};
