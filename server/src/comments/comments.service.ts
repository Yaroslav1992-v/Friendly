import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CommentModel } from './comment.model.ts/comment.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ModelType<CommentModel>,
  ) {}
  async createComment(comment: CommentDto) {
    return (await this.commentModel.create(comment)).populate(
      'user',
      'name image',
    );
  }
  async getComments(postId: string): Promise<CommentModel[]> {
    const comments = await this.commentModel
      .find({ postId })
      .populate('user', 'name image')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!comments) {
      throw new NotFoundException(`Comment with ID ${{ postId }} not found`);
    }

    return [...comments];
  }
}
