import { CreateMessageData, Message } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/message/";
const messageService = {
  createMessage: async (message: CreateMessageData): Promise<Message> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      message,
    });
    return data;
  },
  loadMessages: async (chatId: string): Promise<Message[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getMessages/${chatId}`
    );
    return data;
  },
};

export default messageService;
