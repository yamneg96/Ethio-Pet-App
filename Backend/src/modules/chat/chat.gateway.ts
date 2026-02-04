import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../../common/utils/redis.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) return client.disconnect();

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });
      client.data.userId = payload.sub;
      const redis = await this.redisService.getClient();
      await redis.set(`presence:${payload.sub}`, 'online', 'EX', 60);
    } catch {
      return client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      const redis = await this.redisService.getClient();
      await redis.set(`presence:${userId}`, 'offline', 'EX', 60);
    }
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { orderId: string }) {
    const room = await this.chatService.getOrCreateRoom(data.orderId, client.data.userId);
    client.join(room.id);
    return room;
  }

  @SubscribeMessage('typing')
  async typing(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string; isTyping: boolean }) {
    client.to(data.roomId).emit('typing', { userId: client.data.userId, isTyping: data.isTyping });
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: SendMessageDto) {
    const message = await this.chatService.sendMessage(data.roomId, client.data.userId, data.content);
    this.server.to(data.roomId).emit('message', message);
    return message;
  }
}
