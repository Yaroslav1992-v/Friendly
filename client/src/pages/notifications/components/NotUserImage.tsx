import React from "react";
import { Avatar } from "../../../components";
import { NotUserImageProps } from "./Notifications.prop";

export const NotUserImage = ({ firstUser, secondUser }: NotUserImageProps) => {
  return (
    <div className="notifications__user-images">
      <div className="notifications__user-firstUser">
        <Avatar size="M" url={firstUser} />
      </div>
      {secondUser && (
        <div className="notifications__user-secondUser">
          <Avatar size="MS" url={secondUser} />
        </div>
      )}
    </div>
  );
};
