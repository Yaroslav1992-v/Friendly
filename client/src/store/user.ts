import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { Errors, Follow, User } from "../props/props";
import userService from "../services/userService";
import fileService from "../services/fileService";

interface UserState {
  isLoading: boolean;
  error: string | null | Errors;
  users: User[];
  dataLoaded: boolean;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  isLoading: false,
  error: null,
  users: [],
  dataLoaded: false,
  isLoggedIn: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state: UserState) => {
      state.users = [];
      state.isLoading = true;
    },
    usersReceived: (state: UserState, action: PayloadAction<User>) => {
      state.dataLoaded = true;
      if (!Array.isArray(action.payload)) {
        state.users = [action.payload];
      } else {
        state.users = action.payload;
      }

      state.isLoading = false;
    },
    usersRequestFailed: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userEditRequested: (state: UserState) => {
      state.isLoading = true;
    },
    userEdited: (state: UserState, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id);
      state.users[index] = action.payload;
      state.isLoading = false;
    },
    userFollowed: (state: UserState, action: PayloadAction<Follow>) => {
      const index = state.users.findIndex(
        (u) => u._id === action.payload.followingId
      );
      state.users[index].followers.push(action.payload.followerId);
    },
    userUnfollowed: (state: UserState, action: PayloadAction<Follow>) => {
      const index = state.users.findIndex(
        (u) => u._id === action.payload.followingId
      );
      state.users[index].followers = state.users[index].followers.filter(
        (f) => f !== action.payload.followerId
      );
    },
  },
});
const followRequested = createAction("user/FollowRequested");
const unfollowRequested = createAction("user/UnFollowRequested");
export const loadUserData = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(usersRequested());
    const data = await userService.loadUserData(userId);
    dispatch(usersReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const editUser =
  (user: User, file?: File) => async (dispatch: Dispatch) => {
    let image;
    try {
      dispatch(userEditRequested());
      if (file) {
        image = await fileService.uploadFile(file);
        if (user.image) {
          await fileService.deleteFile(user.image);
        }
        user = { ...user, image: image };
      }
      const editedUser = await userService.editUser({
        ...user,
      });
      dispatch(userEdited(editedUser));
    } catch (error: any) {
      const data = error?.response?.data;
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(usersRequestFailed(data ? data : message));
    }
  };
export const followUser = (follow: Follow) => async (dispatch: Dispatch) => {
  try {
    dispatch(followRequested());
    await userService.followUser(follow);
    dispatch(userFollowed(follow));
  } catch (error: any) {
    console.log(error);
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const unfollowUser = (follow: Follow) => async (dispatch: Dispatch) => {
  try {
    dispatch(unfollowRequested());
    await userService.unfollowUser(follow);
    dispatch(userUnfollowed(follow));
  } catch (error: any) {
    console.log(error);
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const getUserData =
  (userId: string) =>
  (state: { users: UserState }): User | undefined =>
    state.users.users.find((u) => u._id === userId);
export const getIsLoading = () => (state: { users: UserState }) =>
  state.users.isLoading;
export const getUserError = () => (state: { users: UserState }) =>
  state.users.error;
const { reducer: userReducer, actions } = userSlice;
const {
  usersRequested,
  usersRequestFailed,
  usersReceived,
  userEdited,
  userEditRequested,
  userFollowed,
  userUnfollowed,
} = actions;

export default userReducer;
