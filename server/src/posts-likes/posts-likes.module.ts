import { Module } from '@nestjs/common';
import { PostsLikesController } from './posts-likes.controller';
import { PostsLikesService } from './posts-likes.service';

@Module({
  controllers: [PostsLikesController],
  providers: [PostsLikesService]
})
export class PostsLikesModule {}
