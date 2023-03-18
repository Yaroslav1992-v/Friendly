import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostDto } from './dto/post.dto';
import { PostModel } from './post.model/post.model';
import { InjectModel } from 'nestjs-typegoose';

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
}
