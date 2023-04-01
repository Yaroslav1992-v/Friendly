import React, { useState } from "react";
import { Avatar, DotsBtn } from "../../..";

import { HeadProps } from "./Publication.props";
import { Link } from "react-router-dom";
import localStorageService from "../../../../services/localStorageService";
import { useAppDispatch } from "../../../../store/createStore";
import { removePostById } from "../../../../store/post";

export const PublicationHead = ({
  name,
  avatar,
  userId,
  postId,
}: HeadProps) => {
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const handleOpenRemove = () => {
    setOpenRemove((prevState) => !prevState);
  };
  const dispatch = useAppDispatch();
  const removePost = () => {
    dispatch(removePostById(postId));
  };
  const currentUser = localStorageService.getUserId();
  return (
    <div className="publication__head">
      <Link to={`/account/${userId}`} className="publication__head-content">
        <Avatar size="M" url={avatar} />
        <div className="publication__head-info">
          <h3 className="publication__head-user">{name}</h3>
        </div>
      </Link>
      <DotsBtn action={handleOpenRemove} />
      {openRemove && currentUser === userId && (
        <button onClick={removePost} className="poblication">
          Delete
        </button>
      )}
    </div>
  );
};
