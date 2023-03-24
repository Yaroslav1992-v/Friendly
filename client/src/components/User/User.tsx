import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "..";

import { AdditionalUsersData, MinUser } from "./Users.props";

export const User = ({
  name,
  image,
  _id,
  data,
}: MinUser & AdditionalUsersData) => {
  return (
    <div className="users__user">
      {"isFollowing" in data ? (
        <>
          <Link to={`/account/${_id}`} className="users__link">
            <div className="users__img">
              <Avatar size="M" url={image} />
            </div>
            <h4 className="users__name">{name}</h4>
          </Link>
          <Button
            onClick={() => data.action(_id, data.isFollowing)}
            text={data.isFollowing ? "Following" : "Follow"}
            color={data.isFollowing ? "white" : "primary"}
          />
        </>
      ) : (
        <div onClick={() => data(_id)} className="users__link">
          <div className="users__img">
            <Avatar size="M" url={image} />
          </div>
          <h4 className="users__name">{name}</h4>
        </div>
      )}
    </div>
  );
};
