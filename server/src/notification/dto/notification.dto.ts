import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsObject,
} from 'class-validator';

export enum NotificationType {
  Message = 'message',
  Comment = 'comment',
  CommentReply = 'commentReply',
  PostLike = 'postLike',
  CommentLike = 'commentLike',
  Follow = 'follow',
}
export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
export class NotificationDto {
  @IsString()
  author: string;
  @IsString()
  reciever: string;
  @IsEnum(NotificationType)
  type: NotificationType;
  @IsOptional()
  @IsString()
  content?: string;
  @IsString()
  typeId: string;
  @IsOptional()
  @IsObject()
  post?: { id?: string; url?: string };
  @IsBoolean()
  isRead: boolean;
}
