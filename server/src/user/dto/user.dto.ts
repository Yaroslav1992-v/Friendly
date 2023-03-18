import {
  IsString,
  IsArray,
  IsOptional,
  MinLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Types } from 'mongoose';
export class FollowDto {
  @IsString()
  followingId: Types.ObjectId;
  @IsString()
  followerId: Types.ObjectId;
}
export class UserMin {
  @IsString()
  _id: Types.ObjectId;
  @IsOptional()
  @IsString()
  image?: string;
  @IsArray()
  name: string;
}
export class UserEditDto {
  _id: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  image?: string;
  @IsOptional()
  status?: string;
}
