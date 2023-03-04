import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import * as console from 'console';
import { JwtService } from 'src/jwt/jwt.service';
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }
    console.log(request.headers);
    const token = authorizationHeader.slice(7);

    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
