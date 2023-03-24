import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ChatModel } from './chat.model/chat.model';
import { chatDto } from './dto/chat.dto';
import { Types } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel)
    private readonly chatModel: ModelType<ChatModel>,
  ) {}
  async createChat(data: chatDto) {
    const chat = await this.chatModel
      .findOne({ firstUser: data.firstUser, secondUser: data.secondUser })
      .populate('firstUser', 'name image')
      .populate('secondUser', 'name image');
    if (chat) {
      return chat;
    }
    const newChat = await this.chatModel.create(data);
    newChat.populate('firstUser', 'name image');
    return newChat.populate('secondUser', 'name image');
  }
  async getChats(userId: Types.ObjectId): Promise<ChatModel[]> {
    const chats = await this.chatModel
      .find({
        $or: [{ firstUser: userId }, { secondUser: userId }],
      })
      .populate('firstUser', 'name image')
      .populate('secondUser', 'name image')
      .exec();
    if (!chats) {
      throw new NotFoundException(`chats not found  `);
    }

    return chats;
  }
}
