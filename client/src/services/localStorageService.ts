import { Token } from "../props/props";
const ACCESS_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
export function setTokens({
  accessToken,
  refreshToken,
  _id,
  expiresIn = 90000,
}: Token) {
  const expiresDate = new Date().getTime() + expiresIn * 10;
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(USERID_KEY, _id);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
}
export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};
export default localStorageService;
