import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
export class ReplyDto {
  @IsString()
  to: string;
  @IsString()
  parentId: string;
  @IsString()
  name: string;
}
export interface EditCommentDto {
  data: { commentId: string; content: string };
}
export class CommentDto {
  @IsString()
  user: string;
  @IsString()
  content: string;
  @IsString()
  postId: string;
  @IsOptional()
  @ValidateNested()
  reply?: ReplyDto;
}
