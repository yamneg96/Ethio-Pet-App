import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderStatus } from './dto/update-order-status.dto';
import { notificationEvents, NOTIFICATION_EVENTS } from '../notifications/notifications.events';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(buyerId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id: reservationId, buyerId },
      include: { pet: true, payment: true },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.status !== 'CONFIRMED') throw new BadRequestException('Reservation not confirmed');
    if (reservation.payment?.status !== 'PAID') throw new BadRequestException('Payment not completed');

    const existingOrder = await this.prisma.order.findFirst({ where: { reservationId } });
    if (existingOrder) return existingOrder;

    return this.prisma.order.create({
      data: {
        reservationId,
        buyerId,
        sellerId: reservation.pet.sellerId,
        status: 'PLACED',
      },
    });
  }

  async updateOrderStatus(orderId: string, sellerId: string, status: OrderStatus) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, sellerId } });
    if (!order) throw new NotFoundException('Order not found');

    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      PLACED: ['CONFIRMED'],
      CONFIRMED: ['IN_TRANSIT'],
      IN_TRANSIT: ['DELIVERED'],
      DELIVERED: [],
    };

    if (!validTransitions[order.status as OrderStatus].includes(status)) {
      throw new BadRequestException('Invalid order status transition');
    }

    const updated = await this.prisma.order.update({ where: { id: orderId }, data: { status } });

    notificationEvents.emit(NOTIFICATION_EVENTS.ORDER_STATUS_CHANGED, {
      userId: updated.buyerId,
      message: `Your order status is now ${status}`,
      data: { orderId: updated.id, status },
    });

    return updated;
  }

  async listMyOrders(buyerId: string) {
    return this.prisma.order.findMany({
      where: { buyerId },
      include: { reservation: { include: { pet: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
