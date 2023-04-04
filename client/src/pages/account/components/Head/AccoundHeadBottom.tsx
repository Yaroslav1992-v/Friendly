import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountHeadBottomProps } from "../../Account.props";

export const AccoundHeadBottom = ({
  followers,
  following,
  posts,
}: AccountHeadBottomProps) => {
  const { pathname } = useLocation();
  return (
    <div className="account__head-bottom">
      <Link
        state={{ from: pathname }}
        to={"followers"}
        className="account__head-digital"
      >
        <h3 className="account__head-number">{followers}</h3>
        <span className="account__head-text">Followers</span>
      </Link>
      <Link
        state={{ from: pathname }}
        to={"following"}
        className="account__head-digital"
      >
        <h3 className="account__head-number">{following}</h3>
        <span className="account__head-text">Following</span>
      </Link>
      <Link
        state={{ from: pathname }}
        to={"publications"}
        className="account__head-digital"
      >
        <h3 className="account__head-number">{posts}</h3>
        <span className="account__head-text">Posts</span>
      </Link>
    </div>
  );
};
