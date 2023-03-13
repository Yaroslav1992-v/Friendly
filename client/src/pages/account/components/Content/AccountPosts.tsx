import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostImagesArray } from "./../../../../store/post";
import { GrGallery } from "react-icons/gr";
export const AccountPosts = () => {
  const images = useSelector(getPostImagesArray());
  return (
    <ul className="account__posts">
      {images.map((item, i) => (
        <li key={i} className="account__posts-item">
          <Link to={"/publications"}>
            <img
              src={`${item[0].url}`}
              alt="pic"
              className={`account__posts-photo ${item[0].objectFit}`}
            />
          </Link>
          {item.length > 1 && <GrGallery />}
        </li>
      ))}
    </ul>
  );
};
