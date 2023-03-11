import { IsString, IsArray, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  userId: string;
  @IsOptional()
  @IsString()
  text: string;
  @IsArray()
  images: string[];
}
