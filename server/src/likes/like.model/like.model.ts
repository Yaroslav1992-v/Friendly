import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from '../../user/user.model/user.model';

export interface LikeModel extends Base {}
export class LikeModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  author: Types.ObjectId;
  @prop({ enum: ['comment', 'post'], required: true })
  type: 'comment' | 'post';
  @prop()
  parentId?: Types.ObjectId;
}
