import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CommentModel } from 'src/comments/comment.model.ts/comment.model';
import { LikeDto } from './dto/like.dto';
import { LikeModel } from './like.model/like.model';

import { PostModel } from 'src/posts/post.model/post.model';
import { Types } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(LikeModel) private readonly likeModel: ModelType<LikeModel>,
    @InjectModel(CommentModel)
    private readonly commentModel: ModelType<CommentModel>,
    @InjectModel(PostModel)
    private readonly postModel: ModelType<PostModel>,
  ) {}
  async createLike(like: LikeDto) {
    const newLike = await this.likeModel.create({ ...like });

    // } else if (newLike.type === 'post') {
    //   await this.postModel.updateOne(
    //     { _id: newLike.parentId },
    //     { $push: { likes: newLike._id } },
    //   );

    return newLike;
  }
  async deleteLike(likeId: Types.ObjectId) {
    await this.likeModel.findByIdAndRemove(likeId);
  }
  async deleteLikesByParentId(parentId: Types.ObjectId) {
    await this.likeModel.deleteMany({ parentId });
  }
  async getCommentsLikes(id: string) {
    const post = await this.postModel.findById(id);
    const comments = post.comments;
    const models = await this.likeModel.find({
      type: 'comment',
      parentId: { $in: comments },
    });
    return models;
  }

  async getPostsLikes(data: Types.ObjectId[]) {
    const likes = await this.likeModel.find({
      type: 'post',
      parentId: { $in: data },
    });

    return likes;
  }
}
