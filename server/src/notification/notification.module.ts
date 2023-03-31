import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationModel } from './notification.model/notification.model';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NotificationModel,
        schemaOptions: {
          collection: 'Notification',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [NotificationService, JwtService],
  controllers: [NotificationController],
})
export class NotificationModule {}
