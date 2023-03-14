import React from "react";
import { Avatar, DotsBtn } from "../../..";

import { HeadProps } from "./Publication.props";

export const PublicationHead = ({ name, avatar }: HeadProps) => {
  return (
    <div className="publication__head">
      <div className="publication__head-content">
        <Avatar size="M" url={avatar} />
        <div className="publication__head-info">
          <h3 className="publication__head-user">{name}</h3>
        </div>
      </div>
      <DotsBtn />
    </div>
  );
};
