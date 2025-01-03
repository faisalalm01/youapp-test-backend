import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/helper/jwt';
import { CreateRoomDto } from 'src/utils/dto/room.dto';
import { GetChatDto } from 'src/utils/dto/chat.dto';
import { ChatsService } from 'src/chats/chats.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly chatsService: ChatsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(req.user._id.toString(), createRoomDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getByRequest(@Request() req) {
    return this.roomsService.getByRequest(req.user._id.toString());
  }

  @Get(':id/chats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  getChats(@Param('id') id, @Query() dto: GetChatDto) {
    return this.chatsService.findAll(id, new GetChatDto(dto));
  }
}
