import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types, ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from 'src/posts/post.model/post.model';
import { CommentModel } from './comment.model.ts/comment.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ModelType<CommentModel>,
    @InjectModel(PostModel)
    private readonly postModel: ModelType<PostModel>,
  ) {}
  async createComment(comment: CommentDto) {
    const newComment = (await this.commentModel.create(comment)).populate(
      'user',
      'name image',
    );
    await this.postModel.updateOne(
      { _id: comment.postId },
      { $push: { comments: (await newComment)._id } },
    );
    return newComment;
  }
  async removeComment(
    commentId: string,
    userId: Types.ObjectId,
  ): Promise<void> {
    const comment = await this.commentModel.findOne({ _id: commentId });

    if (comment.user.toString() !== userId.toString()) {
      throw new NotFoundException(`Unathorized`);
    }
    await this.postModel.updateOne(
      { _id: comment.postId },
      { $pull: { comments: commentId } },
    );
    await this.commentModel.deleteMany({ 'reply.parentId': commentId }).exec();
    await comment.delete();
  }
  async editComment(
    commentId: string,
    content: string,
    userId: Types.ObjectId,
  ): Promise<CommentModel> {
    const comment = await this.commentModel.findOne({ _id: commentId });

    if (comment.user.toString() !== userId.toString()) {
      throw new NotFoundException(`Unathorized`);
    }

    comment.content = content;
    comment.save();
    return comment.populate('user', 'name image');
  }
  async getComments(postId: string): Promise<CommentModel[]> {
    const comments = await this.commentModel
      .find({ postId })
      .populate('user', 'name image')
      .exec();
    if (!comments) {
      throw new NotFoundException(`Comment with ID ${{ postId }} not found`);
    }

    return [...comments];
  }
}
