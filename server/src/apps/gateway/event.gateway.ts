import { Message } from '@/database';
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

  handleMessage(data: Message, uid: string) {
    console.log('handleMessage', data);
    this.server.to(uid).emit('getMessage', data);
  }

  handleConnection(client: Socket) {
    const uid = client.handshake.query['uid'];
    client.join(uid);
  }

  handleDisconnect(client: Socket) {
    const uid = client.handshake.query['uid'];
    client.leave(`${uid}`);
  }
}
