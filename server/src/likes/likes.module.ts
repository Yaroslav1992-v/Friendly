import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeModel } from './like.model/like.model';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommentModel } from 'src/comments/comment.model.ts/comment.model';
import { PostModel } from 'src/posts/post.model/post.model';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: LikeModel,
        schemaOptions: {
          collection: 'Like',
        },
      },
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
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
  providers: [LikesService, JwtService],
  controllers: [LikesController],
})
export class LikesModule {}
