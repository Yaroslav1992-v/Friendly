import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { LikeDto } from './dto/like.dto';
import { LikesService } from './likes.service';
import { LikeModel } from './like.model/like.model';
import { Types } from 'mongoose';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createLike(@Body() dto: LikeDto) {
    return this.likesService.createLike(dto);
  }
  @Delete('delete/:likeId')
  @UseGuards(AuthGuard)
  async delete(@Param('likeId') likeId: Types.ObjectId): Promise<void> {
    return this.likesService.deleteLike(likeId);
  }
  @Get('getCommentsLikes/:id')
  @UseGuards(AuthGuard)
  async getCommentsLikes(@Param('id') id: string): Promise<LikeModel[]> {
    return this.likesService.getCommentsLikes(id);
  }
  @Post('getPostsLikes')
  @UseGuards(AuthGuard)
  async getPostLikes(
    @Body() { data }: { data: Types.ObjectId[] },
  ): Promise<LikeModel[]> {
    console.log(data);
    return this.likesService.getPostsLikes(data);
  }
}
