import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  async createChat(@Body() { message }: { message: MessageDto }) {
    try {
      return await this.messageService.createMessage(message);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('getMessages/:chatId')
  @UseGuards(AuthGuard)
  async getMessages(@Param('chatId') chatId: Types.ObjectId) {
    try {
      return await this.messageService.getMessages(chatId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
