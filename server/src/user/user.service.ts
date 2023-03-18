import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserMin } from './dto/user.dto';
import { UserModel } from './user.model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async findOneById(id: string): Promise<UserMin> {
    const user: UserMin = await this.userModel
      .findById(id)
      .select('name _id image');
    if (!user) {
      throw new NotFoundException(`User with ID ${{ id }} not found`);
    }

    return user;
  }
  async findUserDataById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${{ id }} not found`);
    }

    return user;
  }
}
