import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { ChatModel } from '../chat/chat.model/chat.model';
import { MessageDto } from './dto/message.dto';
import MessageModel from './message.model/message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageModel)
    private readonly messageModel: ModelType<MessageModel>,
    @InjectModel(ChatModel)
    private readonly chatModel: ModelType<ChatModel>,
  ) {}
  async createMessage(msg: MessageDto) {
    const newMessage = await this.messageModel.create(msg);
    await this.chatModel.findByIdAndUpdate(
      {
        _id: newMessage.chatId,
      },
      {
        lastMessage: {
          message: newMessage.content,
          createdAt: newMessage.createdAt,
        },
      },
    );

    return newMessage;
  }

  async getMessages(chatId: Types.ObjectId): Promise<MessageModel[]> {
    const messages = await this.messageModel.find({ chatId }).exec();
    if (!messages) {
      throw new NotFoundException(
        `Messagess from chat with ID ${{ chatId }} not found`,
      );
    }

    return messages;
  }
}
