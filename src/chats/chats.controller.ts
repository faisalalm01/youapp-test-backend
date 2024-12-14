import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/utils/helper/jwt';
import { CreateChatDto, GetChatDto } from 'src/utils/dto/chat.dto';

@ApiTags('Chats')
@ApiBearerAuth()
@Controller('')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('viewMessage')
  async getChats(@Req() req: Request, @Query() getChatDto: GetChatDto) {
    const userId = req.user['userId'];
    return this.chatsService.findAll(userId, getChatDto);
  }

  @Post('sendMessage')
  async createChat(@Req() req: Request, @Body() createChatDto: CreateChatDto) {
    const userId = req.user['userId'];
    return this.chatsService.create(userId, createChatDto);
  }
}
