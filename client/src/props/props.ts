export interface Errors {
  email?: string;
  password?: string;
  name?: string;
  terms?: string;
  image?: string;
}

export interface RegisterData {
  _id?: string;
  email: string;
  password: string;
  name: string;
  image?: string;
}
export interface UserData extends Token {
  followers: [];
  following: [];
}
export interface Token {
  refreshToken: string;
  accessToken: string;
  _id: string;
  expiresIn: number;
}

export interface AuthData {
  email: string;
  password: string;
}
