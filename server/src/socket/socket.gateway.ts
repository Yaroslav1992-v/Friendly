import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from 'src/message/dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  rooms: Record<string, string[]>;
  constructor() {
    this.rooms = {};
  }
  @WebSocketServer() server: Server;
  handleConnection(client: Socket, data) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconected: ${client.id}`);
  }
  @SubscribeMessage('setup')
  setup(@MessageBody() id: string, @ConnectedSocket() client: Socket): void {
    client.join(id);
  }
  @SubscribeMessage('join')
  join(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
    payload: any,
  ): void {
    client.join(id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() msg: MessageDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const users = this.server.sockets.adapter.rooms.get(msg.chatId);
    client.broadcast.to(msg.chatId).emit('new-message', msg);
  }
  @SubscribeMessage('typing')
  typing(
    @MessageBody() data: Pick<MessageDto, 'chatId' | 'user'>,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.to(data.user).emit('typing', data.chatId);
  }
  @SubscribeMessage('stop-typing')
  stopTyping(
    @MessageBody() data: Pick<MessageDto, 'chatId' | 'user'>,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.to(data.user).emit('stop-typing', data.chatId);
  }
}
