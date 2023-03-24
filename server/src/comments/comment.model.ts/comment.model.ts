import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from 'src/user/user.model/user.model';
import { PostModel } from './../../posts/post.model/post.model';
export interface CommnetModel extends Base {}

export class CommentModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  user: Types.ObjectId;
  @prop({ required: true, type: Types.ObjectId, ref: PostModel })
  postId: Types.ObjectId;
  @prop()
  reply?: { to: Types.ObjectId; parentId: Types.ObjectId; name: string };
  @prop()
  content: string;
}
