import React, { useEffect, useRef } from "react";
import { Post } from "../../hoc/hooks/usePosts/usePost.types";
import { Publication } from "./publication/Publication";
import { useSelector } from "react-redux";
import { getPostsIds } from "./../../store/post";
import { useAppDispatch } from "../../store/createStore";
import { loadPostLikes } from "../../store/likes";
import { getLikes } from "./../../store/likes";
import localStorageService from "../../services/localStorageService";
import { useLocation } from "react-router-dom";

export const Publications = ({ posts }: { posts: Post[] }) => {
  const postIds = useSelector(getPostsIds());

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadPostLikes(postIds));
  }, []);
  const likes = useSelector(getLikes());
  const getPostLikes = (postId: string): typeof likes => {
    return likes.filter((l) => l.parentId === postId);
  };
  const userId = localStorageService.getUserId();
  const pathName = useLocation().pathname;

  return (
    <div className="publications">
      <ul className="publications__list">
        {posts.map((p) => (
          <li key={p._id} className="publications__item">
            <Publication
              {...{
                ...p,
                likes: getPostLikes(p._id),
                pathName,
                currentUser: userId as string,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
