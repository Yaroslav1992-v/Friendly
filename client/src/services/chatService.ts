import { Chat, CreateChatData } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/chats/";
const chatService = {
  createChat: async (users: CreateChatData): Promise<Chat> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      users,
    });
    return data;
  },
  loadChats: async (): Promise<Chat[]> => {
    const { data } = await httpService.get(`${apiEndPoint}getChats`);
    return data;
  },
};

export default chatService;
