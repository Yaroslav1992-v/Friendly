import { RegisterData, UserData } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/user/";
const userService = {
  loadCurrentUser: async (id: string): Promise<UserData> => {
    const { data } = await httpService.get(`${apiEndPoint}getById/${id}`, {});
    return data;
  },
};

export default userService;
