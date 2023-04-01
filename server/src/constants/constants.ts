import { Types } from 'mongoose';

export const ALREADY_EXISTS = 'User with this email already exists!';
export const WRONG_DATA = 'Wrong email or password';
export interface AuthUser {
  user: { id: Types.ObjectId; iat: number; exp: number };
}
export const getPublicIdFromUrl = (imageUrl: string): string | undefined => {
  const baseUrl = 'http://res.cloudinary.com/';
  const parts = imageUrl.split(baseUrl);

  if (parts.length < 2) {
    return undefined;
  }
  const cloudNameAndPath = parts[1].split('/');
  const fileName = cloudNameAndPath[cloudNameAndPath.length - 1];
  const lastDotIndex = fileName.lastIndexOf('.');
  const publicId = fileName.substring(0, lastDotIndex);
  return publicId;
};
