import { IsString, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UserMin {
  @IsString()
  _id: Types.ObjectId;
  @IsOptional()
  @IsString()
  image?: string;
  @IsArray()
  name: string;
}
