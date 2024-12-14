import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/utils/shema/chat.schema';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
