import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { UserModel } from '../../user/user.model/user.model';
interface Image {
  objectFit: string;
  url: string;
}
export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
  @prop({ required: true, type: Types.ObjectId, ref: UserModel })
  userId: Types.ObjectId;
  @prop()
  text: string;
  @prop({
    required: true,
    type: () => [Object],
    validate: (images: Image[]) =>
      images.every(
        (image) =>
          typeof image.objectFit === 'string' && typeof image.url === 'string',
      ),
  })
  images: Image[];
  @prop({ type: () => [String] })
  comments: string[];
}
