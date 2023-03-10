import React from "react";
import { Link } from "react-router-dom";
import { AccountHeadBottomProps } from "../../Account.props";

export const AccoundHeadBottom = ({
  followers,
  following,
  posts,
}: AccountHeadBottomProps) => {
  return (
    <div className="account__head-bottom">
      <Link to={"/names"} className="account__head-digital">
        <h3 className="account__head-number">{followers}</h3>
        <span className="account__head-text">Followers</span>
      </Link>
      <Link to={"/names"} className="account__head-digital">
        <h3 className="account__head-number">{following}</h3>
        <span className="account__head-text">Followers</span>
      </Link>
      <div className="account__head-digital">
        <h3 className="account__head-number">{posts}</h3>
        <span className="account__head-text">Posts</span>
      </div>
    </div>
  );
};
