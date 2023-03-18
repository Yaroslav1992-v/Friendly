import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "./storeTypes";
import { User } from "../props/props";
import userService from "../services/userService";

interface UserState {
  isLoading: boolean;
  error: string | null;
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
  },
});

// export const loadUser = (userId: string) => async (dispatch: Dispatch) => {
//   try {
//     dispatch(usersRequested());
//     const data = await userService.loadCurrentUser(userId);
//     dispatch(usersReceived(data));
//   } catch (error: any) {
//     const message = error.response?.data?.message || "Something went wrong";
//     dispatch(usersRequestFailed(message));
//   }
// };
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
export const getUserData =
  (userId: string) =>
  (state: { users: UserState }): User | undefined =>
    state.users.users.find((u) => u._id === userId);

const { reducer: userReducer, actions } = userSlice;
const { usersRequested, usersRequestFailed, usersReceived } = actions;

export default userReducer;
