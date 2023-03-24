import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  StartPage,
  Main,
  Friends,
  Chats,
  Notifications,
  CommentsPage,
  Chat,
} from "../pages";
import localStorageService from "../services/localStorageService";
import { getIsLoggedIn } from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import { loadUserData } from "../store/user";
import { PostsProvider } from "./hooks/usePosts/usePost";
import UserDataLoader from "./UserDataLoader";
import { getCurrentUser } from "./../store/auth";
import { SearchProvider } from "./hooks/useSearch/useSearch";

const AppLoader = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useAppDispatch();
  const userId = localStorageService.getUserId();
  const currentUser = useSelector(getCurrentUser());
  const location = useLocation();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(userId as string));
    }
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </> //gfd
    );
  } else {
    return (
      <>
        {currentUser && (
          <Routes>
            //main and chats routes are there
            <Route path="/*" element={<SearchProvider />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/account/:userId/*" element={<UserDataLoader />} />
            <Route path="/p/*" element={<PostsProvider />} />
            <Route path="/p/:postId/comments" element={<CommentsPage />} />
          </Routes>
        )}
      </>
    );
  }
};
export default AppLoader;
