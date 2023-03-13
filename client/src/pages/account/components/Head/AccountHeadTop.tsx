import React from "react";
import { useParams } from "react-router-dom";

import { Avatar } from "../../../../components";
import { ChatIcon, EditIcon, LoveIcon } from "../../../../components/Icons";
import { AccountHeadTopProps } from "../../Account.props";
import { AccountHeadAction } from "./AccountHeadAction";
export const AccountHeadTop = ({ url, id }: AccountHeadTopProps) => {
  const handleSomething = () => {};
  const { userId } = useParams();
  return (
    <div className="account__head-top">
      <AccountHeadAction action={"/chat"} Icon={<ChatIcon />} name="Message" />

      <Avatar size="XL" url={url} />
      {userId === id ? (
        <AccountHeadAction
          action={handleSomething}
          Icon={<EditIcon />}
          name="Edit"
        />
      ) : (
        <AccountHeadAction
          action={handleSomething}
          Icon={<LoveIcon />}
          name="Follow"
        />
      )}
    </div>
  );
};
