import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { NavigateFunction } from "react-router-dom";
import fileService from "../services/fileService";
import {
  createPostData,
  Images,
  PostData,
} from "../hoc/hooks/usePosts/usePost.types";
import postService from "../services/postService";

interface PostState {
  isLoading: boolean;
  error: string | null;
  dataLoaded: boolean;
  posts: PostData[];
}
const initialState: PostState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
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
    postCreateSucceded: (state: PostState) => {
      state.isLoading = false;
    },
    postsReceived: (state: PostState, action: PayloadAction<PostData[]>) => {
      state.dataLoaded = true;
      state.posts = action.payload;
      state.isLoading = false;
    },
    postRequestFailed: (state: PostState, action: PayloadAction<string>) => {
      state.error = action.payload;
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
      dispatch(postCreateSucceded());
      navigate("/");
    } catch (error: any) {
      if (uploadedFiles) {
        const files = uploadedFiles.map((f) => f.url);
        await fileService.deleteFiles(files);
      }

      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postRequestFailed(message));
    }
  };

// export const loadCurrentUser = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch(userRequsted());
//     const data = await userService.loadCurrentUser(
//       localStorageService.getUserId()!
//     );
//     dispatch(userRecived(data));
//   } catch (error: any) {
//     console.log(error);
//     const message = error.response?.data?.message || "Something went wrong";
//     dispatch(authRequestFailed(message));
//   }
// }
export const setErorr = (error: string) => (dispatch: Dispatch) =>
  dispatch(postRequestFailed(error));
export const getPostLoading =
  () =>
  (state: { posts: PostState }): boolean =>
    state.posts.isLoading;
export const getPostError =
  () =>
  (state: { posts: PostState }): string | null =>
    state.posts.error;
const { reducer: postsReducer, actions } = postsSlice;
const {
  postsRequested,
  postCreateRequested,
  postCreateSucceded,
  postRequestFailed,
  postsReceived,
} = actions;

export default postsReducer;
