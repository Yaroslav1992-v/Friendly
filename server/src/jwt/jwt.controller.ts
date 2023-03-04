import { Body, Controller, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtService } from './jwt.service';

@Controller('jwt')
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}
  @Post('token')
  async refreshToken(
    @Body() { id, token }: { id: Types.ObjectId; token: string },
  ) {
    try {
      const valid = await this.jwtService.verifyRefreshToken(token);
      if (valid) {
        return {
          accessToken: this.jwtService.signAccessToken({ id }),
          refreshToken: this.jwtService.signRefreshToken({ id }),
          _id: id,
        };
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}
