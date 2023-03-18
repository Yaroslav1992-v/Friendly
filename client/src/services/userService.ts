import { User, UserMinData } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/user/";
const userService = {
  loadCurrentUser: async (id: string): Promise<UserMinData> => {
    const { data } = await httpService.get(`${apiEndPoint}getById/${id}`, {});
    return data;
  },
  loadUserData: async (id: string): Promise<User> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getUserDataById/${id}`,
      {}
    );
    return data;
  },
};

export default userService;
