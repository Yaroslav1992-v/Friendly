import { Types } from 'mongoose';

export const ALREADY_EXISTS = 'User with this email already exists!';
export const WRONG_DATA = 'Wrong email or password';
export interface AuthUser {
  user: { id: Types.ObjectId; iat: number; exp: number };
}
