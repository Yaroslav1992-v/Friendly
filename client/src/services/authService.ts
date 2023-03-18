import { RegisterData, Token, UserData, UserMinData } from "../props/props";
import httpService from "./httpService";
import localStorageService from "./localStorageService";
import { AuthData } from "./../props/props";
import axios, { AxiosInstance } from "axios";
import configFile from "../config.json";
const token: AxiosInstance = axios.create({
  baseURL: configFile.apiEndPoint,
});

const apiEndPoint = "/auth/";
const authService = {
  register: async (user: RegisterData): Promise<UserData> => {
    const { data } = await httpService.post(`${apiEndPoint}register`, {
      ...user,
    });

    return data;
  },
  login: async ({ email, password }: AuthData): Promise<UserData> => {
    const { data } = await httpService.post(`${apiEndPoint}login`, {
      email,
      password,
    });

    return data;
  },
  loadCurrentUser: async (id: string): Promise<UserMinData> => {
    const { data } = await httpService.get(`${apiEndPoint}findById/${id}`, {});
    return data;
  },
  refreshToken: async (): Promise<Token> => {
    const { data } = await token.post(`/jwt/token`, {
      token: localStorageService.getRefreshToken(),
      id: localStorageService.getUserId(),
    });
    return data;
  },
};

export default authService;
