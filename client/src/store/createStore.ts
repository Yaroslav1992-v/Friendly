import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./post";
import commentsReducer from "./comment";
import userReducer from "./user";
import likesReducer from "./likes";
import chatsReducer from "./chats";
import messageReducer from "./message";
import notificationsReducer from "./notificaton";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  users: userReducer,
  likes: likesReducer,
  chats: chatsReducer,
  messages: messageReducer,
  notifications: notificationsReducer,
});
function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
