import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  postsService: any;
  constructor(private readonly commentsService: CommentsService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createPost(@Body() dto: CommentDto) {
    console.log(dto);
    return this.commentsService.createComment(dto);
  }
  @Get('getComments/:postId')
  @UseGuards(AuthGuard)
  async getByUserId(@Param('postId') postId: string) {
    try {
      return await this.commentsService.getComments(postId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
