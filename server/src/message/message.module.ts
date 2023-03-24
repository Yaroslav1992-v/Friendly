import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { ChatModel } from 'src/chat/chat.model/chat.model';
import { ChatService } from 'src/chat/chat.service';
import { MessageController } from './message.controller';
import MessageModel from './message.model/message.model';
import { MessageService } from './message.service';
import { JwtService } from 'src/jwt/jwt.service';
@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MessageModel,
        schemaOptions: {
          collection: 'Message',
        },
      },
      {
        typegooseClass: ChatModel,
        schemaOptions: {
          collection: 'Chat',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, ChatService, JwtService],
})
export class MessageModule {}
