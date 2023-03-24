import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Chats, Chat } from "../pages";
import { loadChats } from "../store/chats";
import { useAppDispatch } from "../store/createStore";
import { useSelector } from "react-redux";
import { getChatsDataLoaded } from "./../store/chats";
import { Spinner } from "../components";

const ChatLoader = () => {
  const dispatch = useAppDispatch();
  const dataLoaded = useSelector(getChatsDataLoaded());
  useEffect(() => {
    dispatch(loadChats());
  }, [dataLoaded]);
  if (dataLoaded) {
    return (
      <>
        <Routes>
          <Route index element={<Chats />} />
          <Route path="/:chatId" element={<Chat />} />
        </Routes>
      </>
    );
  } else {
    return <Spinner />;
  }
};
export default ChatLoader;
