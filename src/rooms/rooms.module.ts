import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/utils/shema/rooms.schema';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    ChatsModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
