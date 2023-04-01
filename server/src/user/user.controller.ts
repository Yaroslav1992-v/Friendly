import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/constants/constants';
import { AuthGuard } from '../auth/guards/jwt.guard';
import { UserEditDto, FollowDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  searchUser;
  @Get('getById/:id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Get('searchUser/:name')
  @UseGuards(AuthGuard)
  async searchByName(@Param('name') name: string) {
    try {
      return this.userService.findUsersByName(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Post('findUsers')
  @UseGuards(AuthGuard)
  async findUsers(@Body() data: string[]) {
    try {
      return this.userService.findUsers(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('getUserDataById/:id')
  @UseGuards(AuthGuard)
  async findUserDataById(@Param('id') id: string) {
    return this.userService.findUserDataById(id);
  }
  @Patch('edit')
  @UseGuards(AuthGuard)
  async editUser(@Body() data: UserEditDto, @Req() req: AuthUser) {
    try {
      if (req.user.id !== data._id) {
        throw new NotFoundException('Unathorized');
      }
      return this.userService.editUser(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('follow')
  @UseGuards(AuthGuard)
  async followUser(@Body() data: FollowDto) {
    try {
      return this.userService.followUser(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('unfollow')
  @UseGuards(AuthGuard)
  async unfollowUser(@Body() data: FollowDto) {
    try {
      return this.userService.unfollowUser(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
