import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { FollowDto, UserEditDto, UserMin } from './dto/user.dto';
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
    const user = await this.userModel
      .findById(id)
      .select('-password -updatedAt -__v -createdAt');
    if (!user) {
      throw new NotFoundException(`User with ID ${{ id }} not found`);
    }

    return user;
  }
  async editUser(data: UserEditDto): Promise<UserModel> {
    const existingUser = await this.userModel.findOne({ email: data.email });
    if (existingUser && existingUser._id.toString() !== data._id.toString()) {
      throw new NotFoundException({
        email: `Email ${data.email} already exists`,
      });
    }
    const user = await this.userModel
      .findByIdAndUpdate(data._id, data, { new: true })
      .select('-password -updatedAt -__v -createdAt');
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
  async followUser(data: FollowDto): Promise<void> {
    console.log(data);
    await this.userModel.updateOne(
      { _id: data.followerId },
      { $push: { following: data.followingId } },
    );
    await this.userModel.updateOne(
      { _id: data.followingId },
      { $push: { followers: data.followerId } },
    );
  }
  async unfollowUser(data: FollowDto): Promise<void> {
    await this.userModel.updateOne(
      { _id: data.followerId },
      { $pull: { following: data.followingId } },
    );
    await this.userModel.updateOne(
      { _id: data.followingId },
      { $pull: { followers: data.followerId } },
    );
  }
}
