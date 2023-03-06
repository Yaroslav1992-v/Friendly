import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop()
  image?: string;
  @prop()
  phoneNumber?: string;
  @prop()
  name: string;
  @prop({ unique: true })
  email: string;
  @prop()
  password: string;
  @prop()
  currentStatus?: string;
  @prop()
  following: string[];
  @prop()
  followers: string[];
  @prop()
  status: string;
}
