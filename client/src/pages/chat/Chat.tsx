import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowButton,
  Avatar,
  Container,
  TextForm,
  TopNavigation,
  Typing,
} from "../../components";
import { MessageBox } from "./components/MessageBox";
import { useSelector } from "react-redux";
import { getChatById } from "./../../store/chats";
import localStorageService from "../../services/localStorageService";
import {
  Chat as IChat,
  CreateMessageData,
  createNotificationData,
  NotificationType,
  UserMinData,
} from "../../props/props";
import { useAppDispatch } from "../../store/createStore";
import {
  createMessage,
  getMessages,
  loadMessages,
  recivedMessage,
} from "./../../store/message";
import { groupMessagesByDate } from "../../utils/helpers";
import { UseApp } from "../../hoc/AppLoader";
import {
  countNotificationsType,
  createNotification,
  removeNotificationsByType,
} from "../../store/notificaton";

export const Chat = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/chats");
  };
  const dispatch = useAppDispatch();
  const { socket } = UseApp();
  const { chatId } = useParams();
  const unreadCount = useSelector(
    countNotificationsType(chatId as string, "message")
  );
  const [typing, setTyping] = useState<boolean>(false);
  const chat = useSelector(getChatById(chatId as string));
  const [message, setMessage] = useState<string>();
  const currentUserId = localStorageService.getUserId() as string;
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    socket.off("users-count");
    socket.off("message");
    socket.off("new-message");
    socket.emit("join", chatId);
    dispatch(loadMessages(chatId as string));
    socket.on("new-message", (newMessage) => {
      dispatch(recivedMessage(newMessage));
    });
    socket.on("typing", () => setTyping(true));
    socket.on("stop-typing", () => setTyping(false));
    if (unreadCount > 0 && chat) {
      dispatch(
        removeNotificationsByType(chat._id, "message", checkUser(chat)._id)
      );
    }
  }, []);

  const messages = useSelector(getMessages());
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let check: boolean = false;
    e.preventDefault();
    if (message) {
      const newMessage: CreateMessageData = {
        content: message,
        chatId: chatId as string,
        user: currentUserId,
      };
      const createdMsg = await dispatch(createMessage(newMessage));
      setMessage("");
      if (chat) {
        socket.emit("message", createdMsg);
        socket.on("users-count", async (users) => {
          if (users === 1 && createdMsg && !check) {
            check = true;
            const notif: createNotificationData = {
              author: currentUserId,
              content: createdMsg.content,
              type: NotificationType.Message,
              reciever: checkUser(chat)._id,
              typeId: createdMsg.chatId,
            };
            const notification = await dispatch(createNotification(notif));
            if (notification) {
              socket.emit("notify", notification);
            }
          }
        });
        socket.emit("stop-typing", { chatId, user: checkUser(chat)._id });
      }
    }
  };
  const handleTyping = () => {
    if (!typing && chat) {
      socket.emit("typing", { chatId, user: checkUser(chat)._id });
    }
    if (chat)
      setTimeout(() => {
        socket.emit("stop-typing", { chatId, user: checkUser(chat)._id });
      }, 5000);
  };
  const handleText = () => {
    setMessage(textRef.current?.value);
    const height = textRef.current!.scrollHeight;
    if (textRef.current!.scrollHeight < 150) {
      textRef.current!.style.height = height + "px";
    }
    handleTyping();
  };
  const checkUser = (chat: IChat): UserMinData => {
    if (chat.firstUser._id === currentUserId) {
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
              secondElement={
                <Link to={`/account/${checkUser(chat)._id}`}>
                  <Avatar size="MS" url={checkUser(chat).image} />
                </Link>
              }
            />
            <div className="chat__container">
              <MessageBox
                messages={groupMessages}
                currentUserId={currentUserId}
              />
              {typing && <Typing />}
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
