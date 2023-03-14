import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { NavigateFunction } from "react-router-dom";
import fileService from "../services/fileService";
import {
  createPostData,
  Images,
  Post,
} from "../hoc/hooks/usePosts/usePost.types";
import postService from "../services/postService";

interface PostState {
  isLoading: boolean;
  error: string | null;
  getPostError: string | null;
  dataLoaded: boolean;
  posts: Post[];
}
const initialState: PostState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  getPostError: null,
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postCreateRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postCreateSucceded: (state: PostState, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    postsReceived: (state: PostState, action: PayloadAction<Post[]>) => {
      state.dataLoaded = true;
      state.posts = action.payload;
      state.isLoading = false;
    },
    postCreateFailed: (state: PostState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postRequestFailed: (state: PostState, action: PayloadAction<string>) => {
      state.getPostError = action.payload;
      state.isLoading = false;
    },
  },
});
export const uploadPost =
  (
    data: { text: string; userId: string },
    files: Images[],
    navigate: NavigateFunction
  ) =>
  async (dispatch: Dispatch) => {
    let uploadedFiles;
    try {
      dispatch(postCreateRequested());
      uploadedFiles = await fileService.uploadFiles(files);
      if (!uploadedFiles) {
        dispatch(postRequestFailed("Images Not Uploaded"));
        return;
      }
      const newFile: createPostData = {
        ...data,
        images: [...uploadedFiles],
      };
      const post = await postService.createPost(newFile);
      dispatch(postCreateSucceded(post));
      navigate("/");
    } catch (error: any) {
      if (uploadedFiles) {
        const files = uploadedFiles.map((f) => f.url);
        await fileService.deleteFiles(files);
      }

      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postCreateFailed(message));
    }
  };

export const getPostsByUserId =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(postsRequested());
      const data = await postService.getPostsByUserId(userId);
      dispatch(postsReceived(data));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postRequestFailed(message));
    }
  };
export const getPostLoading =
  () =>
  (state: { posts: PostState }): boolean =>
    state.posts.isLoading;

export const setErorr = (error: string) => (dispatch: Dispatch) =>
  dispatch(postRequestFailed(error));
export const getPostsImages = () => (state: { posts: PostState }) => {
  const images = state.posts.posts.map((p) => p.images);
  return images.reduce((prev, curr) => prev.concat(...curr), []);
};
export const getPostImagesArray = () => (state: { posts: PostState }) =>
  state.posts.posts.map((p) => p.images);
export const getPosts = () => (state: { posts: PostState }) =>
  state.posts.posts;
export const getPostError =
  () =>
  (state: { posts: PostState }): string | null =>
    state.posts.error;
const { reducer: postsReducer, actions } = postsSlice;
const {
  postsRequested,
  postCreateRequested,
  postCreateSucceded,
  postCreateFailed,
  postsReceived,
  postRequestFailed,
} = actions;

export default postsReducer;
