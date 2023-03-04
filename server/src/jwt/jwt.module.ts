import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './jwt.service';
import { JwtController } from './jwt.controller';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
  controllers: [JwtController],
})
export class JwtModule {}
