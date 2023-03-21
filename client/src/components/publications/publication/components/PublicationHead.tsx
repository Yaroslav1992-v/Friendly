import React from "react";
import { Avatar, DotsBtn } from "../../..";

import { HeadProps } from "./Publication.props";
import { Link } from "react-router-dom";

export const PublicationHead = ({ name, avatar, userId }: HeadProps) => {
  return (
    <div className="publication__head">
      <Link to={`/account/${userId}`} className="publication__head-content">
        <Avatar size="M" url={avatar} />
        <div className="publication__head-info">
          <h3 className="publication__head-user">{name}</h3>
        </div>
      </Link>
      <DotsBtn />
    </div>
  );
};
