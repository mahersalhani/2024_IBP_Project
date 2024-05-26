import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleMessage(message: string, conversationId: number) {
    this.server.to(`conversation-${conversationId}`).emit('getMessage', message);
  }

  handleConnection(client: Socket) {
    const conversationId = client.handshake.query['conversationId'];
    client.join(`conversation-${conversationId}`);
  }

  handleDisconnect(client: Socket) {
    const conversationId = client.handshake.query['conversationId'];
    client.leave(`conversation-${conversationId}`);
  }
}
