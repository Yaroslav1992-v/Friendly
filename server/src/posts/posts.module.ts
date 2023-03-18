import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from './post.model/post.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { CommentModel } from 'src/comments/comment.model.ts/comment.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
        },
      },
    ]),
    CommentsModule,
    ConfigModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule {}
