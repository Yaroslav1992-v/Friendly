import React from "react";
import { AvatarProps } from "./Avatar.props";

export const Avatar = ({ url, size }: AvatarProps) => {
  return (
    <div className={`avatar avatar-${size}`}>
      {url && <img className="avatar__img" src={url} alt="avatar" />}
    </div>
  );
};
