import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostDto } from './dto/post.dto';
import { PostModel } from './post.model/post.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { getPublicIdFromUrl } from 'src/constants/constants';
import { FileService } from 'src/file/file.service';
import { LikesService } from 'src/likes/likes.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: ModelType<PostModel>,
    private readonly fileServive: FileService,
    private readonly likeServive: LikesService,
    private readonly commentService: CommentsService,
  ) {}
  async createPost(post: PostDto) {
    const newPost = {
      ...post,
      likes: [],
      comments: [],
    };
    return await this.postModel.create(newPost);
  }

  async findPostByPostId(postId: string): Promise<PostModel> {
    const post = await this.postModel
      .findById(postId)
      .populate('userId', 'name image')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${{ postId }} not found`);
    }

    return post;
  }
  async findPostByUserId(userId: string): Promise<PostModel[]> {
    const posts = await this.postModel
      .find({ userId })
      .populate('userId', 'name image')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!posts) {
      throw new NotFoundException(`Post with ID ${{ userId }} not found`);
    }

    return [...posts];
  }
  async removePost(postId: string): Promise<void> {
    const post = await this.postModel.findById(postId);
  
    if (post) {
      const files = post.images.map((i) => getPublicIdFromUrl(i.url));
      await this.fileServive.deleteImages(files);
      await this.likeServive.deleteLikesByParentId(post._id);
      await this.commentService.removeComments(postId);
      await post.delete();
    } else {
      throw new NotFoundException(`Post not found`);
    }
  }
  async loadPosts(data: Types.ObjectId[]): Promise<PostModel[]> {
    const posts = await this.postModel
      .find({
        userId: { $in: data },
      })
      .populate('userId', 'name image')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!posts) {
      throw new NotFoundException(`Post not found`);
    }
    return posts;
  }
}
