import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async findOneById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return { message: 'User not found' };
    }

    return user;
  }
}
