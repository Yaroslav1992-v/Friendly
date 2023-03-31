import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from '../../user/user.model/user.model';
import { NotificationType } from '../dto/notification.dto';
export interface NotificationModel extends Base {}
export class NotificationModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  author: Types.ObjectId;
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  reciever: Types.ObjectId;
  @prop({ type: String, enum: NotificationType })
  type: NotificationType;
  @prop()
  typeId: Types.ObjectId;
  @prop()
  post?: {id?:string,url?:string};
  @prop()
  content?: string;
  @prop({ default: false })
  isRead?: boolean;
}
