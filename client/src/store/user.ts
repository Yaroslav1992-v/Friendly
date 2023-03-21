import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { Errors, Follow, User, UserMinData } from "../props/props";
import userService from "../services/userService";
import fileService from "../services/fileService";
import localStorageService from "../services/localStorageService";
import { updateCurrentUser } from "./auth";
import { AppDispatch } from "./createStore";

interface UserState {
  isLoading: boolean;
  error: string | null | Errors;
  user: User | null;
  searchedUsers: UserMinData[];
  dataLoaded: boolean;
}
const initialState: UserState = {
  isLoading: false,
  error: null,
  user: null,
  searchedUsers: [],
  dataLoaded: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRequested: (state: UserState) => {
      state.user = null;
      state.dataLoaded = true;
    },
    userSearchRequested: (state: UserState) => {
      state.dataLoaded = true;
    },
    userSearchCompleted: (
      state: UserState,
      action: PayloadAction<UserMinData[]>
    ) => {
      if (state.searchedUsers.length > 0) {
        const users = [
          ...state.searchedUsers,
          ...action.payload.filter(
            (user) =>
              !state.searchedUsers.some((sUser) => sUser._id === user._id)
          ),
        ];
        state.searchedUsers = users;
      } else {
        state.searchedUsers = action.payload;
      }
      state.dataLoaded = false;
    },
    userReceived: (state: UserState, action: PayloadAction<User>) => {
      state.dataLoaded = false;
      state.user = action.payload;
    },
    usersRequestFailed: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userEditRequested: (state: UserState) => {
      state.isLoading = true;
    },
    userEdited: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userFollowed: (state: UserState, action: PayloadAction<Follow>) => {
      if (state.user) {
        state.user.followers.push(action.payload.followerId);
      }
    },
    userUnfollowed: (state: UserState, action: PayloadAction<Follow>) => {
      if (state.user) {
        state.user.followers = state.user.followers.filter(
          (f) => f !== action.payload.followerId
        );
      }
    },
  },
});
const followRequested = createAction("user/FollowRequested");
const unfollowRequested = createAction("user/UnFollowRequested");
export const loadUserData =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userRequested());
      const data = await userService.loadUserData(userId);
      if (userId === localStorageService.getUserId()) {
        dispatch(
          updateCurrentUser({
            ...data,
          })
        );
      }
      dispatch(userReceived(data));
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
export const followUser =
  (follow: Follow, user?: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(followRequested());
      await userService.followUser(follow);
      if (!user) {
        dispatch(userFollowed(follow));
      } else {
        const currentUser = {
          ...user,
          following: [...user.following, follow.followingId],
        };
        dispatch(updateCurrentUser(currentUser));
      }
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(usersRequestFailed(message));
    }
  };
export const searchUser = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userSearchRequested());
    const users = await userService.searchUser(name);
    dispatch(userSearchCompleted(users));
  } catch (error: any) {
    console.log(error);
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(usersRequestFailed(message));
  }
};
export const unfollowUser =
  (follow: Follow, user?: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(unfollowRequested());
      await userService.unfollowUser(follow);
      if (!user) {
        dispatch(userUnfollowed(follow));
      } else {
        const currentUser: User = {
          ...user,
          following: user.following.filter((u) => u !== follow.followingId),
        };
        dispatch(updateCurrentUser(currentUser));
      }
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(usersRequestFailed(message));
    }
  };
export const findUserIndex = (users: { _id: string }[], id: string) =>
  users.findIndex((u) => u._id === id);

export const getUserFollows =
  () =>
  (state: { users: UserState }): string[] | undefined =>
    state.users.user?.following;

export const getSearchedUsers = () => (state: { users: UserState }) =>
  state.users.searchedUsers;
export const getUserData =
  () =>
  (state: { users: UserState }): User | null =>
    state.users.user;
export const getIsDataLoaded = () => (state: { users: UserState }) =>
  state.users.dataLoaded;
export const getIsLoading = () => (state: { users: UserState }) =>
  state.users.isLoading;
export const getUserError = () => (state: { users: UserState }) =>
  state.users.error;
const { reducer: userReducer, actions } = userSlice;
const {
  userRequested,
  usersRequestFailed,
  userReceived,
  userEdited,
  userEditRequested,
  userSearchRequested,
  userFollowed,
  userUnfollowed,
  userSearchCompleted,
} = actions;

export default userReducer;
