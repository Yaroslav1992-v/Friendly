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
  currentPost: Post | undefined;
  posts: Post[];
  feedPosts: Post[];
}
const initialState: PostState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  getPostError: null,
  posts: [],
  currentPost: undefined,
  feedPosts: [],
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
    postsReceived: (
      state: PostState,
      action: PayloadAction<{ posts: Post[] | Post; where?: "feed" }>
    ) => {
      const { posts, where } = action.payload;
      state.dataLoaded = true;
      if (Array.isArray(posts)) {
        if (where === "feed") {
          state.feedPosts = posts;
        } else {
          state.posts = posts;
        }
      } else {
        state.currentPost = posts;
      }
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
    postRemoved: (state: PostState, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
  },
});
export const removePostById =
  (postId: string) => async (dispatch: Dispatch) => {
    try {
      await postService.removePost(postId);
      dispatch(postRemoved(postId));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postCreateFailed(message));
    }
  };
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
      dispatch(postsReceived({ posts: data }));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postRequestFailed(message));
    }
  };
export const loadPosts = (userIds: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch(postsRequested());
    const data = await postService.loadPosts(userIds);

    dispatch(postsReceived({ posts: data, where: "feed" }));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(postRequestFailed(message));
  }
};
export const loadCurrentPost =
  (postId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(postsRequested());
      const data = await postService.loadPost(postId);
      console.log(data);
      if (data) dispatch(postsReceived({ posts: data }));
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
export const getPostsIds =
  () =>
  (state: { posts: PostState }): string[] => {
    const posts = state.posts.posts.map((p) => p._id);
    const feedPosts = state.posts.feedPosts.map((p) => p._id);
    return [...posts, ...feedPosts.filter((postId) => !posts.includes(postId))];
  };

export const getPostsCount = () => (state: { posts: PostState }) =>
  state.posts.posts.length;

export const getPostImagesArray = () => (state: { posts: PostState }) =>
  state.posts.posts.map((p) => p.images);
export const getPosts =
  (kind: "feed" | "posts") => (state: { posts: PostState }) =>
    kind === "posts" ? state.posts.posts : state.posts.feedPosts;
export const getPostByUserId =
  (postId: string) => (state: { posts: PostState }) => {
    let post = state.posts.posts.find((p) => p._id === postId);
    if (!post) {
      post = state.posts.feedPosts.find((p) => p._id === postId);
    }
    if (!post) {
      post = state.posts.currentPost;
    }
    return post;
  };
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
  postRemoved,
  postsReceived,
  postRequestFailed,
} = actions;

export default postsReducer;
