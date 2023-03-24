import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { MessageModel } from '../../message/message.model/message.model';
import { UserModel } from '../../user/user.model/user.model';

export interface ChatModel extends Base {}

export class ChatModel extends TimeStamps {
  @prop({ type: Types.ObjectId, ref: UserModel })
  firstUser: Types.ObjectId;
  @prop({ type: Types.ObjectId, ref: UserModel })
  secondUser: Types.ObjectId;
  @prop({ type: () => [Types.ObjectId], ref: UserModel })
  removeId: Types.ObjectId[];
  @prop()
  lastMessage: { message: string; createdAt: Date };
}
