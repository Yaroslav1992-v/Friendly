import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getById/:id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Get('getUserDataById/:id')
  @UseGuards(AuthGuard)
  async findUserDataById(@Param('id') id: string) {
    return this.userService.findUserDataById(id);
  }
}
