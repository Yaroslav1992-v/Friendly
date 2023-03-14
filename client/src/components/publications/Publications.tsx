import React from "react";
import { Post } from "../../hoc/hooks/usePosts/usePost.types";
import { Publication } from "./publication/Publication";

export const Publications = ({ posts }: { posts: Post[] }) => {
  console.log(posts);
  return (
    <div className="publications">
      <ul className="publications__list">
        {posts.map((p) => (
          <li key={p._id} className="publications__item">
            <Publication {...p} />
          </li>
        ))}
      </ul>
    </div>
  );
};
