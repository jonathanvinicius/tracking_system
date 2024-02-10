import { InjectQueue } from '@nestjs/bull';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Queue } from 'bull';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoutesGateway {
  constructor(
    @InjectQueue('new-points-route-driver') private newPointsQueue: Queue,
  ) {}

  @SubscribeMessage('new-points')
  async handleMessage(
    client: Socket,
    payload: { route_id: string; lat: number; lng: number },
  ): Promise<void> {
    client.broadcast.emit('admin-new-points', payload);
    client.broadcast.emit(`new-points/${payload.route_id}`, payload);
    await this.newPointsQueue.add(payload);
  }
}
