import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model/user.model';

@Injectable()
export class UserService {
  private readonly users: any[];

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

  async create(user: any): Promise<any> {
    const newUser = { userId: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }
}
