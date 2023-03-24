import { IsString, IsArray, IsOptional } from 'class-validator';

export class MessageDto {
  @IsString()
  user: string;
  @IsString()
  text: string;
  @IsArray()
  chatId: string;
}
