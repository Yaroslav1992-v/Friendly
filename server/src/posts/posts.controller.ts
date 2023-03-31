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
import { Types } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(@Body() dto: PostDto) {
    return this.postsService.createPost(dto);
  }
  @Post('loadPosts')
  @UseGuards(AuthGuard)
  async loadPosts(@Body() { data }: { data: Types.ObjectId[] }) {
    try {
      return this.postsService.loadPosts(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('loadPost/:postId')
  @UseGuards(AuthGuard)
  async loadPost(@Param('postId') postId: string) {
    try {
      return await this.postsService.findPostByPostId(postId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
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
