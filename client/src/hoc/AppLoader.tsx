import React, { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { StartPage, Notifications, CommentsPage } from "../pages";
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
import { recieveNotification } from "../store/notificaton";
import { Notification } from "../props/props";
import { loadNotifications } from "./../store/notificaton";
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
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(userId as string));
      dispatch(loadNotifications(userId as string));
      socket = io(`${configFile.apiEndPoint}`);
      socket.off("notification");
      socket.emit("setup", userId);
      socket.on("notification", (data: Notification) => {
        dispatch(recieveNotification(data));
      });
    } else {
      navigate("/");
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
      </>
    );
  } else {
    return (
      <>
        {currentUser && (
          <AppContex.Provider value={contextValue}>
            <Routes>
              {/* //main and chats routes are there */}
              <Route path="/*" element={<SearchProvider />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/account/:userId/*" element={<UserDataLoader />} />
              <Route path="/addPost/*" element={<PostsProvider />} />
              <Route path="/p/:postId/comments" element={<CommentsPage />} />
              <Route
                path="/p/:postId/comments/:commentId"
                element={<CommentsPage />}
              />
            </Routes>
          </AppContex.Provider>
        )}
      </>
    );
  }
};
export default AppLoader;
