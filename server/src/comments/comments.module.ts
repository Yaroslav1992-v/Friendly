import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { CommentModel } from './comment.model.ts/comment.model';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [CommentsService, JwtService],
  controllers: [CommentsController],
})
export class CommentsModule {}
