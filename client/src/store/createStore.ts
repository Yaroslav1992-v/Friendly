import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./post";
import commentsReducer from "./comment";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
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
