import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { Like, LikeData, User } from "../props/props";
import likesService from "../services/likeService";

import { AppDispatch } from "./createStore";

interface LikesState {
  isLoading: boolean;
  error: string | null;
  likes: LikeData[];
  dataLoaded: boolean;
  isLoggedIn: boolean;
}
const initialState: LikesState = {
  isLoading: false,
  error: null,
  likes: [],
  dataLoaded: false,
  isLoggedIn: true,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likesRequested: (state: LikesState) => {
      state.likes = [];
      state.isLoading = true;
    },
    likesReceived: (state: LikesState, action: PayloadAction<LikeData[]>) => {
      state.dataLoaded = true;
      state.likes = action.payload;
      state.isLoading = false;
    },
    likesRequestFailed: (state: LikesState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likeCreated: (state: LikesState, action: PayloadAction<LikeData>) => {
      state.likes.push(action.payload);
    },
    likeRemoved: (state: LikesState, action: PayloadAction<string>) => {
      const likes = state.likes.filter((l) => l._id !== action.payload);
      state.likes = likes;
    },
  },
});
const createLikeRequested = createAction("like/createLikeRequested");
const removeLikeRequested = createAction("like/removeLikeRequested");
export const createLike = (like: Like) => async (dispatch: AppDispatch) => {
  try {
    dispatch(createLikeRequested());
    const newLike = await likesService.createLike(like);

    dispatch(likeCreated(newLike));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(likesRequestFailed(message));
  }
};
export const removeLike = (likeId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeLikeRequested());
    await likesService.removeLike(likeId);
    dispatch(likeRemoved(likeId));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(likesRequestFailed(message));
  }
};
export const loadCommentsLikes =
  (postId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(likesRequested());
      const likes = await likesService.getCommentLikes(postId);
      dispatch(likesReceived(likes));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(likesRequestFailed(message));
    }
  };
export const loadPostLikes =
  (postIds: string[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(likesRequested());
      const likes = await likesService.getPostsLikes(postIds);
      dispatch(likesReceived(likes));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(likesRequestFailed(message));
    }
  };
export const getLikes = () => (state: { likes: LikesState }) =>
  state.likes.likes;
const { reducer: likesReducer, actions } = likesSlice;
const {
  likesRequested,
  likesRequestFailed,
  likesReceived,
  likeRemoved,
  likeCreated,
} = actions;

export default likesReducer;
