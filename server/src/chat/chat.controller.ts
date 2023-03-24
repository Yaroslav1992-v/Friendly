import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser } from 'src/constants/constants';

import { ChatService } from './chat.service';
import { chatDto } from './dto/chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  async createChat(@Body() { users }: { users: chatDto }) {
    try {
      return await this.chatService.createChat(users);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('getChats')
  @UseGuards(AuthGuard)
  async getChats(@Req() req: AuthUser) {
    try {
      return await this.chatService.getChats(req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
