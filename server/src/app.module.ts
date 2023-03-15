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
import { PostsLikesModule } from './posts-likes/posts-likes.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsLikesModule } from './comments-likes/comments-likes.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    PostsModule,
    JwtModule,
    FileModule,
    CommentsModule,
    // PostsLikesModule,

    // CommentsLikesModule,
  ],

  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
