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
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { LikesService } from 'src/likes/likes.service';
import { LikesModule } from 'src/likes/likes.module';
import { LikeModel } from 'src/likes/like.model/like.model';
import { CommentsService } from 'src/comments/comments.service';

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
      {
        typegooseClass: LikeModel,
        schemaOptions: {
          collection: 'Like',
        },
      },
    ]),
    CommentsModule,
    ConfigModule,
    FileModule,
    LikesModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    JwtService,
    FileService,
    LikesService,
    CommentsService,
  ],
})
export class PostsModule {}
