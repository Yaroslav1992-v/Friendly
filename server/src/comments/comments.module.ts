import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
