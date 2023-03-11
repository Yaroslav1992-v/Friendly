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
  image?: File | string;
}
export interface UserData extends Token {
  followers: [];
  following: [];
  image?: string;
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
export interface PostData {
  images: string[];
  text: string;
  userId: string;
}
