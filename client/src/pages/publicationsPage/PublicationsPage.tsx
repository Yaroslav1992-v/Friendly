import React, { useEffect, useRef } from "react";
import {
  ArrowButton,
  DotsBtn,
  Publications,
  TopNavigation,
} from "../../components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPosts } from "../../store/post";

export const PublicationsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const posts = useSelector(getPosts("posts"));
  const goBack = () => {
    const to = location.state?.from ? location.state.from : "/";
    navigate(to);
  };
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!postId) {
      topRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, []);
  return (
    <section className="publications-page">
      <div ref={topRef} className="container">
        <TopNavigation
          firstElement={<ArrowButton side="left" click={goBack} />}
          title="Publications"
          secondElement={<DotsBtn />}
        />
        {posts.length > 0 && <Publications posts={posts} />}
      </div>
    </section>
  );
};
