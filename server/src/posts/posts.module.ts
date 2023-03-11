import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from './post.model/post.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule {}
