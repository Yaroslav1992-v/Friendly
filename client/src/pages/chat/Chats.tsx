import React, { useEffect } from "react";
import {
  ArrowButton,
  Container,
  DotsBtn,
  Navigation,
  SearchField,
  TopNavigation,
  Users,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { ChatPreview } from "./components/ChatPreview";
import { useSearch } from "./../../hoc/hooks/useSearch/useSearch";
import localStorageService from "../../services/localStorageService";
import { Chat, CreateChatData, UserMinData } from "../../props/props";
import { useAppDispatch } from "../../store/createStore";
import { createChat, getChats } from "../../store/chats";
import { loadChats } from "./../../store/chats";
import { useSelector } from "react-redux";

export const Chats = () => {
  const navigate = useNavigate();
  const currentUserId = localStorageService.getUserId();
  const { searchQuery, resetSearch, handleSearchQuery, users, isDataLoaded } =
    useSearch();
  const goBack = () => {
    navigate("/");
  };
  const dispatch = useAppDispatch();
  const handleCreateChat = (secondUser: string) => {
    const chat: CreateChatData = {
      firstUser: currentUserId as string,
      secondUser,
    };
    dispatch(createChat(chat, navigate));
  };
  const chats = useSelector(getChats());
  const checkUser = (chat: Chat): UserMinData => {
    if (chat.firstUser._id === currentUserId) {
      return chat.secondUser;
    }
    return chat.firstUser;
  };
  return (
    <section className="Chats">
      <Container background="white" name="container">
        <TopNavigation
          firstElement={<ArrowButton side="left" click={goBack} />}
          title="Chats"
          secondElement={<DotsBtn />}
        />
        <div className="chats__container">
          <SearchField
            value={searchQuery}
            searchQuery={handleSearchQuery}
            resetQuery={resetSearch}
          />
        </div>
        {users.length > 0 ? (
          <Users
            users={users}
            isLoading={isDataLoaded}
            data={handleCreateChat}
            currentUser={currentUserId as string}
          />
        ) : (
          <ul className="chats__list">
            {chats.map(
              (c) =>
                c.lastMessage && (
                  <li key={c._id} className="chats__item">
                    <ChatPreview chat={c} user={checkUser(c)} />
                  </li>
                )
            )}
          </ul>
        )}
        <Navigation />
      </Container>
    </section>
  );
};
