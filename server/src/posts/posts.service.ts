import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostDto } from './dto/post.dto';
import { PostModel } from './post.model/post.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: ModelType<PostModel>,
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
