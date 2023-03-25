import React, { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { StartPage, Friends, Notifications, CommentsPage } from "../pages";
import localStorageService from "../services/localStorageService";
import { getIsLoggedIn } from "../store/auth";
import { useAppDispatch } from "../store/createStore";
import { loadUserData } from "../store/user";
import { PostsProvider } from "./hooks/usePosts/usePost";
import UserDataLoader from "./UserDataLoader";
import { getCurrentUser } from "./../store/auth";
import { SearchProvider } from "./hooks/useSearch/useSearch";
import { io, Socket } from "socket.io-client";
import configFile from "../config.json";
let socket: Socket;
interface AppContextValue {
  socket: Socket;
}
const AppContex = createContext<AppContextValue>({
  socket: io(),
});
export const UseApp = () => {
  return useContext(AppContex);
};
const AppLoader = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useAppDispatch();
  const userId = localStorageService.getUserId();
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(userId as string));
      socket = io(`${configFile.apiEndPoint}`);
      socket.emit("setup", userId);
    }
  }, [isLoggedIn]);
  const contextValue: AppContextValue = {
    socket,
  };
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
          <AppContex.Provider value={contextValue}>
            <Routes>
              {/* //main and chats routes are there */}
              <Route path="/*" element={<SearchProvider />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/account/:userId/*" element={<UserDataLoader />} />
              <Route path="/p/*" element={<PostsProvider />} />
              <Route path="/p/:postId/comments" element={<CommentsPage />} />
            </Routes>
          </AppContex.Provider>
        )}
      </>
    );
  }
};
export default AppLoader;
