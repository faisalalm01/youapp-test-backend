import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from 'src/utils/dto/user.dto';
import { JwtAuthGuard } from 'src/utils/helper/jwt';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('updateProfile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Request() req, @Body() updateUserDto: UserDto) {
    return this.usersService.update(req.user._id.toString(), updateUserDto);
  }

  @Get('getProfile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Request() req) {
    return req.user;
  }
}
