import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

@Injectable()
export class JwtService {
  private refreshKey: string;
  private accessKey: string;
  private refreshExpires: string;
  private accessExpires: string;
  constructor(private readonly configService: ConfigService) {
    this.refreshKey = this.configService.get('JWT_REFRESH');
    this.accessKey = this.configService.get('JWT_ACCESS');
    this.refreshExpires = '7d';
    this.accessExpires = '15m';
  }

  signAccessToken(id: { id: Types.ObjectId }): string {
    return jwt.sign(id, this.accessKey, {
      expiresIn: this.accessExpires,
    });
  }

  signRefreshToken(id: { id: Types.ObjectId }): string {
    return jwt.sign(id, this.refreshKey, {
      expiresIn: this.refreshExpires,
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.accessKey);
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshKey);
  }
}
