import {
  Follow,
  User,
  UserData,
  UserMinData,
  UserPlusData,
} from "../props/props";

import httpService from "./httpService";

const apiEndPoint = "/user/";
const userService = {
  loadCurrentUser: async (id: string): Promise<UserData & UserPlusData> => {
    const { data } = await httpService.get(`${apiEndPoint}getById/${id}`, {});
    return data;
  },
  editUser: async (user: User): Promise<User> => {
    const { data } = await httpService.patch(`${apiEndPoint}edit`, {
      ...user,
    });
    return data;
  },
  loadUserData: async (id: string): Promise<User> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getUserDataById/${id}`,
      {}
    );
    return data;
  },
  searchUser: async (name: string): Promise<UserMinData[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}searchUser/${name}`,
      {}
    );
    return data;
  },
  findUsers: async (ids: string[]): Promise<UserMinData[]> => {
    const { data } = await httpService.post(`${apiEndPoint}findUsers`, ids);
    return data;
  },
  followUser: async (follow: Follow) => {
    const { data } = await httpService.patch(`${apiEndPoint}follow`, follow);
    return data;
  },
  unfollowUser: async (follow: Follow) => {
    const { data } = await httpService.patch(`${apiEndPoint}unfollow`, follow);
    return data;
  },
};

export default userService;
