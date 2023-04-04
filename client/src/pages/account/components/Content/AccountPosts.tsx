import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostImagesArray } from "./../../../../store/post";
import { GrGallery } from "react-icons/gr";
export const AccountPosts = ({ userId }: { userId: string }) => {
  const images = useSelector(getPostImagesArray());
  return (
    <ul className="account__posts">
      {images.map((item, i) => (
        <li key={i} className="account__posts-item">
          <Link
            state={{ from: `/account/${userId}` }}
            to={`publications/${i > 0 ? item.postId : ""}`}
          >
            <img
              src={`${item.images[0].url}`}
              alt="pic"
              className={`account__posts-photo ${item.images[0].objectFit}`}
            />
          </Link>
          {item.images.length > 1 && <GrGallery />}
        </li>
      ))}
    </ul>
  );
};
