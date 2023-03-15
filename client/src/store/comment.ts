import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  CommentData,
  createCommentData,
} from "../pages/commentsPage/components/Comments.props";

import commentsService from "../services/commentService";
interface CommentsState {
  isLoading: boolean;
  error: string | null;
  getPostError: string | null;
  dataLoaded: boolean;
  comments: CommentData[];
}
const initialState: CommentsState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  getPostError: null,
  comments: [],
};

export const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state: CommentsState) => {
      state.isLoading = true;
    },
    commentsCreateRequested: (state: CommentsState) => {
      state.isLoading = true;
    },
    commentsCreateSucceded: (
      state: CommentsState,
      action: PayloadAction<CommentData>
    ) => {
      state.isLoading = false;
      state.comments.unshift(action.payload);
    },
    commentsReceived: (
      state: CommentsState,
      action: PayloadAction<CommentData[]>
    ) => {
      state.dataLoaded = true;
      state.comments = action.payload;
      state.isLoading = false;
    },
    commentsCreateFailed: (
      state: CommentsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (
      state: CommentsState,
      action: PayloadAction<string>
    ) => {
      state.getPostError = action.payload;
      state.isLoading = false;
    },
  },
});
export const createComment =
  (comment: createCommentData) => async (dispatch: Dispatch) => {
    try {
      dispatch(commentsCreateRequested());
      const newComment = await commentsService.createComments(comment);
      dispatch(commentsCreateSucceded(newComment));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(commentsCreateFailed(message));
    }
  };

export const loadComments = (postId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(commentsRequested());
    const data = await commentsService.getComments(postId);
    dispatch(commentsReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(commentsRequestFailed(message));
  }
};

export const getComments =
  () =>
  (state: { comments: CommentsState }): CommentData[] =>
    state.comments.comments;

export const getCommentsLoading =
  () =>
  (state: { comments: CommentsState }): boolean =>
    state.comments.isLoading;

const { reducer: commentsReducer, actions } = CommentsSlice;
const {
  commentsRequested,
  commentsCreateRequested,
  commentsCreateSucceded,
  commentsCreateFailed,
  commentsReceived,
  commentsRequestFailed,
} = actions;

export default commentsReducer;
