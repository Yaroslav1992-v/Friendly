import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { CommentModel } from './comment.model.ts/comment.model';
import { JwtService } from 'src/jwt/jwt.service';
import { PostModel } from 'src/posts/post.model/post.model';
import { LikeModel } from 'src/likes/like.model/like.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
        },
      },
      {
        typegooseClass: LikeModel,
        schemaOptions: {
          collection: 'Like',
        },
      },
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [CommentsService, JwtService],
  controllers: [CommentsController],
})
export class CommentsModule {}
