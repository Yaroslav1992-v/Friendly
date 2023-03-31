import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { FileService } from './file/file.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { SocketGateway } from './socket/socket.gateway';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    LikesModule,
    UserModule,
    PostsModule,
    JwtModule,
    FileModule,
    CommentsModule,
    MessageModule,
    ChatModule,
    NotificationModule,

    // PostsLikesModule,

    // CommentsLikesModule,
  ],

  controllers: [AppController, FileController],
  providers: [AppService, FileService, SocketGateway],
})
export class AppModule {}
