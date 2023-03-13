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
import { AuthGuard } from '../auth/guards/jwt.guard';

import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(@Body() dto: PostDto) {
    console.log(dto);
    return this.postsService.createPost(dto);
  }
  @Get('getPostsByUserId/:userId')
  @UseGuards(AuthGuard)
  async getByUserId(@Param('userId') userId: string) {
    try {
      return await this.postsService.findPostByUserId(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
