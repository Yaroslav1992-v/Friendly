import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import { Dispatch } from "./storeTypes";
import { NavigateFunction } from "react-router-dom";
import { RegisterData, UserData } from "../props/props";
import { AuthData } from "./../props/props";
import userService from "../services/userService";
import fileService from "../services/fileService";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  auth: { userId: string | null } | null;
  currentUser: UserData | null;
  dataLoaded: boolean;
  isLoggedIn: boolean;
}
const initialState: AuthState = localStorageService.getAccessToken()
  ? {
      isLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      currentUser: null,
      dataLoaded: false,
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      dataLoaded: false,
      currentUser: null,
      isLoggedIn: false,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequested: (state: AuthState) => {
      state.isLoading = true;
    },
    userReceived: (state: AuthState, action: PayloadAction<UserData>) => {
      state.dataLoaded = true;
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (
      state: AuthState,
      action: PayloadAction<{ userId: string }>
    ) => {
      state.isLoading = false;
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userRecived: (state: AuthState, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
  },
});
export const signUp = (payload: RegisterData) => async (dispatch: Dispatch) => {
  let image: string = "";
  try {
    if (payload.image) {
      image = await fileService.uploadFile(payload.image as File);
    }
    const data = await authService.register({
      ...payload,
      image: image,
    });
    localStorageService.setTokens({ ...data });
    dispatch(authRequestSuccess({ userId: data._id }));
    dispatch(userRecived(data));
    // navigate("/");
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    if (image) {
      await fileService.deleteFile(image);
    }
    dispatch(authRequestFailed(message));
  }
};
const userRequsted = createAction("current user requestd");
export const signIn = (payload: AuthData) => async (dispatch: Dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.login(payload);

    localStorageService.setTokens({ ...data });
    dispatch(authRequestSuccess({ userId: data._id }));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(authRequestFailed(message));
  }
};
export const loadCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(userRequsted());
    const data = await userService.loadCurrentUser(
      localStorageService.getUserId()!
    );
    dispatch(userRecived(data));
  } catch (error: any) {
    console.log(error);
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(authRequestFailed(message));
  }
};
export const getAuthError =
  () =>
  (state: { auth: AuthState }): string | null => {
    return state.auth.error;
  };
export const getIsLoggedIn =
  () =>
  (state: { auth: AuthState }): boolean => {
    return state.auth.isLoggedIn;
  };

export const getAuthLoading =
  () =>
  (state: { auth: AuthState }): boolean =>
    state.auth.isLoading;
export const getCurrentUser =
  () =>
  (state: { auth: AuthState }): UserData | null =>
    state.auth.currentUser;
export const getCurrentUserId =
  () =>
  (state: { auth: AuthState }): string | null | undefined =>
    state.auth.auth?.userId;
export const getCurrentUserImage =
  () =>
  (state: { auth: AuthState }): string | null | undefined =>
    state.auth.currentUser?.image;

const { reducer: authReducer, actions } = authSlice;
const { authRequestSuccess, authRequested, authRequestFailed, userRecived } =
  actions;

export default authReducer;
