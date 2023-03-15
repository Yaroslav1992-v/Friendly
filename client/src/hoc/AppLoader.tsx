import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Router, Routes } from "react-router-dom";
import {
  StartPage,
  Main,
  Friends,
  Chats,
  Account,
  Notifications,
  CommentsPage,
} from "../pages";
import { getIsLoggedIn, loadCurrentUser } from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import { PostsProvider } from "./hooks/usePosts/usePost";
import UserPostsLoader from "./UserPostsLoader";

const AppLoader = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCurrentUser());
    }
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account/:userId/*" element={<UserPostsLoader />} />
          <Route path="/p/*" element={<PostsProvider />} />
          <Route path="/p/:postId/comments" element={<CommentsPage />} />
        </Routes>
      </>
    );
  }
};
export default AppLoader;
