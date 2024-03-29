import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, CreateChatData, Message } from "../props/props";
import { AppDispatch } from "./createStore";
import chatService from "./../services/chatService";
import { NavigateFunction } from "react-router-dom";

interface ChatsState {
  isLoading: boolean;
  error: string | null;
  chats: Chat[];
  dataLoaded: boolean;
}
const initialState: ChatsState = {
  isLoading: false,
  error: null,
  chats: [],
  dataLoaded: false,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatsRequested: (state: ChatsState) => {
      state.chats = [];
      state.isLoading = true;
    },
    chatsReceived: (state: ChatsState, action: PayloadAction<Chat[]>) => {
      state.dataLoaded = true;
      state.chats = action.payload;
      state.isLoading = false;
    },
    chatsRequestFailed: (state: ChatsState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    chatCreated: (state: ChatsState, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    chatUpdated: (state: ChatsState, action: PayloadAction<Message>) => {
      const { createdAt, content } = action.payload;
      const index = state.chats.findIndex(
        (c) => c._id === action.payload.chatId
      );
      state.chats[index].lastMessage = { createdAt, message: content };
    },
  },
});
const createChatAction = createAction("/createChatRequested");

export const createChat =
  (data: CreateChatData, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(createChatAction());
      const newChat = await chatService.createChat(data);
      dispatch(chatCreated(newChat));
      navigate(`/chats/${newChat._id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
  };
export const updateChat = (data: Message) => async (dispatch: AppDispatch) => {
  dispatch(chatUpdated(data));
};
export const loadChats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(chatsRequested());
    const chats = await chatService.loadChats();

    dispatch(chatsReceived(chats));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(chatsRequestFailed(message));
  }
};
export const getChats = () => (state: { chats: ChatsState }) =>
  state.chats.chats;
export const getChatsDataLoaded = () => (state: { chats: ChatsState }) =>
  state.chats.dataLoaded;
export const getChatById = (chatId: string) => (state: { chats: ChatsState }) =>
  state.chats.chats.find((c) => c._id === chatId);
const { reducer: chatsReducer, actions } = chatsSlice;
const {
  chatsRequested,
  chatUpdated,
  chatsRequestFailed,
  chatsReceived,
  chatCreated,
} = actions;

export default chatsReducer;
