import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LikeDto {
  @IsNotEmpty()
  @IsString()
  author: Types.ObjectId;
  @IsNotEmpty()
  @IsEnum(['comment', 'post'])
  type: 'comment' | 'post';
  @IsNotEmpty()
  @IsString()
  parentId: string;
}
