import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowButton,
  Avatar,
  Container,
  TextForm,
  TopNavigation,
} from "../../components";
import { MessageBox } from "./components/MessageBox";
import { useSelector } from "react-redux";
import { getChatById } from "./../../store/chats";
import localStorageService from "../../services/localStorageService";
import {
  Chat as IChat,
  CreateMessageData,
  UserMinData,
} from "../../props/props";
import { useAppDispatch } from "../../store/createStore";
import {
  createMessage,
  getMessages,
  loadMessages,
} from "./../../store/message";
import { groupMessagesByDate } from "../../utils/helpers";

export const Chat = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/chats");
  };
  const dispatch = useAppDispatch();

  const { chatId } = useParams();
  const chat = useSelector(getChatById(chatId as string));
  const [message, setMessage] = useState<string>();
  const currentUser = localStorageService.getUserId() as string;
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleText = () => {
    setMessage(textRef.current?.value);
    const height = textRef.current!.scrollHeight;
    if (textRef.current!.scrollHeight < 150) {
      textRef.current!.style.height = height + "px";
    }
  };

  useEffect(() => {
    dispatch(loadMessages(chatId as string));
  }, []);
  const messages = useSelector(getMessages());
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      const newMessage: CreateMessageData = {
        content: message,
        chatId: chatId as string,
        user: currentUser,
      };
      dispatch(createMessage(newMessage));
    }
  };

  const checkUser = (chat: IChat): UserMinData => {
    if (chat.firstUser._id === currentUser) {
      return chat.secondUser;
    }
    return chat.firstUser;
  };
  const groupMessages = groupMessagesByDate(messages);

  return (
    <section className="chat">
      <Container name="container" background="white">
        {chat && (
          <>
            <TopNavigation
              firstElement={<ArrowButton side="left" click={goBack} />}
              title={checkUser(chat).name}
              secondElement={<Avatar size="MS" url={checkUser(chat).image} />}
            />
            <div className="chat__container">
              <MessageBox
                messages={groupMessages}
                currentUserId={currentUser}
              />
              <TextForm
                placeholder={"Your Message"}
                value={message || ""}
                handleSubmit={handleSubmit}
                handleText={handleText}
                disabled={false}
                textRef={textRef}
              />
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
