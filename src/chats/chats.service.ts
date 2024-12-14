import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto, GetChatDto } from 'src/utils/dto/chat.dto';
import { Chat, ChatDocument } from 'src/utils/shema/chat.schema';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(senderId: string, createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel({
      ...createChatDto,
      sender_id: senderId,
    });
    return createdChat.save();
  }

  async findAll(roomId: string, getChatDto: GetChatDto) {
    const query = {
      room_id: roomId,
    };

    if (getChatDto.last_id) {
      query['_id'] = { $lt: getChatDto.last_id };
    }

    return this.chatModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(getChatDto.limit);
  }
}
