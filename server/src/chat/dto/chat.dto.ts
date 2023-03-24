import { IsString } from 'class-validator';

export class chatDto {
  @IsString()
  firstUser: string;
  @IsString()
  secondUser: string;
}
