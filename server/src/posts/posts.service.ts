import { Injectable } from '@nestjs/common';
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
}
