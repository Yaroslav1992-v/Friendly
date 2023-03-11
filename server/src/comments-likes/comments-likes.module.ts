import { Module } from '@nestjs/common';
import { CommentsLikesController } from './comments-likes.controller';
import { CommentsLikesService } from './comments-likes.service';

@Module({
  controllers: [CommentsLikesController],
  providers: [CommentsLikesService]
})
export class CommentsLikesModule {}
