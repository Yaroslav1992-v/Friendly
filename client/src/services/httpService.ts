import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import configFile from "../config.json";

import localStorageService from "./localStorageService";
import authService from "./authService";

const http: AxiosInstance = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && Number(expiresDate) < Date.now();
    const accessToken = localStorageService.getAccessToken();
    const newConfig: AxiosRequestConfig = { ...config };

    // if (isExpired) {
    //   localStorageService.removeAuthData();
    // }
    if (accessToken) {
      newConfig.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    if (isExpired) {
      try {
        const data = await authService.refreshToken();
        if (data) {
          localStorageService.setTokens(data);
        }
        if (!data) {
          localStorageService.removeAuthData();
        }
      } catch (error) {
        console.log(error);
      }
    }

    return newConfig as InternalAxiosRequestConfig;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// async function refresh(): Promise<void> {
//   const data = await authService.refreshToken();
//   localStorageService.setTokens(data);
// }

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
