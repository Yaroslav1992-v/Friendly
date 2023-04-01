import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types, ObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from 'src/posts/post.model/post.model';
import { CommentModel } from './comment.model.ts/comment.model';
import { CommentDto } from './dto/comment.dto';
import { LikeModel } from 'src/likes/like.model/like.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ModelType<CommentModel>,
    @InjectModel(PostModel)
    private readonly postModel: ModelType<PostModel>,
    @InjectModel(LikeModel)
    private readonly likeModel: ModelType<LikeModel>,
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
    commentId: Types.ObjectId,
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
    const replies = await this.commentModel.find({
      'reply.parentId': commentId,
    });
    await this.commentModel.deleteMany({
      'reply.parentId': commentId,
    });
    const commentIds = replies.map((comment) => comment._id);
    commentIds.push(commentId);
    const likes = await this.likeModel.deleteMany({
      parentId: { $in: commentIds },
    });
    console.log(likes);
    await comment.delete();
  }
  async removeComments(postId: string): Promise<void> {
    const comments = await this.commentModel.find({ postId });
    const commentIds = comments.map((comment) => comment._id);
    await Promise.all([
      this.commentModel.deleteMany({ postId }),
      this.likeModel.deleteMany({ parentId: { $in: commentIds } }),
    ]);
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
      .sort({ createdAt: 'desc' })
      .populate('user', 'name image')
      .exec();
    if (!comments) {
      throw new NotFoundException(`Comment with ID ${{ postId }} not found`);
    }

    return [...comments];
  }
}
