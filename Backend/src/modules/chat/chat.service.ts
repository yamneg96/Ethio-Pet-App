import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { notificationEvents, NOTIFICATION_EVENTS } from '../notifications/notifications.events';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateRoom(orderId: string, userId?: string) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (userId && order.buyerId !== userId && order.sellerId !== userId) {
      throw new NotFoundException('Chat room not found');
    }

    let room = await this.prisma.chatRoom.findFirst({ where: { orderId } });
    if (!room) {
      room = await this.prisma.chatRoom.create({
        data: {
          orderId,
          buyerId: order.buyerId,
          sellerId: order.sellerId,
        },
      });
    }

    return room;
  }

  async sendMessage(roomId: string, senderId: string, content: string) {
    const message = await this.prisma.message.create({
      data: {
        roomId,
        senderId,
        content,
      },
    });

    const room = await this.prisma.chatRoom.findFirst({ where: { id: roomId } });
    if (room) {
      const recipientId = room.buyerId === senderId ? room.sellerId : room.buyerId;
      notificationEvents.emit(NOTIFICATION_EVENTS.MESSAGE_RECEIVED, {
        userId: recipientId,
        message: 'You received a new message',
        data: { roomId, messageId: message.id },
      });
    }

    return message;
  }

  async listMessages(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
