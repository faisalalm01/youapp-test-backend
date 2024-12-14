import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/utils/helper/jwt';
import { CreateChatDto } from 'src/utils/dto/chat.dto';
import { wsAuthMiddleware } from 'src/utils/helper/auth.middleware';

@WebSocketGateway(800, {
  namespace: '/chats',
})
@UseGuards(WsJwtAuthGuard)
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client,
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    const senderId = client.handshake.user._id.toString();
    const chat = await this.chatsService.create(senderId, createChatDto);

    this.server.emit('new-chat', chat);
  }

  afterInit(client: Socket) {
    client.use((socket, next) => wsAuthMiddleware(socket, next));
  }
}
