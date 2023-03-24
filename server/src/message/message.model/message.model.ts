import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { ChatModel } from '../../chat/chat.model/chat.model';
import { UserModel } from '../../user/user.model/user.model';

export interface MessageModel extends Base {}

export class MessageModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  user: Types.ObjectId;
  @prop({ required: true, type: Types.ObjectId, ref: ChatModel })
  chatId: Types.ObjectId;
  @prop()
  content: string;
}

export default MessageModel;
