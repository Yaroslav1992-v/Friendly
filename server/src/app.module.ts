import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { JwtService } from './jwt/jwt.service';
import { JwtModule } from './jwt/jwt.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { FileService } from './file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    JwtModule,
    FileModule,
  ],

  controllers: [AppController, FileController],
  providers: [AppService, JwtService, FileService],
})
export class AppModule {}
