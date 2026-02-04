import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(userId: string, title: string, body: string, data?: Record<string, string>) {
    return this.prisma.notification.create({
      data: {
        userId,
        title,
        body,
        data: data || {},
      },
    });
  }

  async listMyNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
