import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationDto } from './dto/notification.dto';
import { NotificationModel } from './notification.model/notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationModel)
    private notificationModel: ModelType<NotificationModel>,
  ) {}

  async create(notif: NotificationDto): Promise<NotificationModel> {
    const notification = (await this.notificationModel.create(notif)).populate(
      'author',
      'name image',
    );
    return notification;
  }
  async removeByType(notif: NotificationDto): Promise<number> {
    const deletedNot = await this.notificationModel.deleteMany({
      type: notif.type,
      typeId: notif.typeId,
      author: notif.author,
    });
    return deletedNot.deletedCount;
  }
  async removeNotifications(notsIds: string[]): Promise<number> {
    console.log(notsIds);
    const deletedNot = await this.notificationModel.deleteMany({
      _id: { $in: notsIds },
    });
    console.log(deletedNot);
    return deletedNot.deletedCount;
  }
  async findAll(userId: string): Promise<NotificationModel[]> {
    const not = await this.notificationModel
      .find({ reciever: userId })
      .sort({ createdAt: 'asc' })
      .populate('author', 'name  image')
      .exec();

    return not;
  }

  async findOne(id: string): Promise<NotificationModel> {
    return await this.notificationModel.findById(id).exec();
  }

  async update(notIds: string[]) {
    const updatedNots = await this.notificationModel.updateMany(
      { _id: { $in: notIds } },
      { $set: { isRead: true } },
      { new: true },
    );
    return updatedNots;
  }

  async delete(id: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(id).exec();
  }
}
