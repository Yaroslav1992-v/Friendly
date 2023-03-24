import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import { TypegooseModule } from 'nestjs-typegoose';
import { ChatModel } from './chat.model/chat.model';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ChatModel,
        schemaOptions: {
          collection: 'Chat',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [ChatService, JwtService],
  controllers: [ChatController],
})
export class ChatModule {}
