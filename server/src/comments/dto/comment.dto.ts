import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
export class ReplyDto {
  @IsString()
  to: string;

  @IsString()
  parentId: string;

  @IsString()
  name: string;
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
  @IsOptional()
  @IsArray()
  likes?: string[];
}
