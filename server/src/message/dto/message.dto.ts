import { IsString, IsArray, IsOptional } from 'class-validator';

export class MessageDto {
  @IsString()
  user: string;
  @IsString()
  content: string;
  @IsArray()
  chatId: string;
}
