import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto, DeliveryMethod } from './dto/create-reservation.dto';
import { notificationEvents, NOTIFICATION_EVENTS } from '../notifications/notifications.events';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(buyerId: string, dto: CreateReservationDto) {
    const pet = await this.prisma.pet.findFirst({ where: { id: dto.petId, deletedAt: null } });
    if (!pet) throw new NotFoundException('Pet not found');

    if (dto.deliveryMethod === DeliveryMethod.DELIVERY && !dto.deliveryAddress) {
      throw new BadRequestException('Delivery address required');
    }

    return this.prisma.reservation.create({
      data: {
        buyerId,
        petId: dto.petId,
        status: 'PLACED',
        deliveryMethod: dto.deliveryMethod,
        deliveryAddress: dto.deliveryAddress,
      },
    });
  }

  async confirmReservation(buyerId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id: reservationId, buyerId },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.status !== 'PLACED') throw new BadRequestException('Invalid reservation state');

    const updated = await this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status: 'CONFIRMED' },
    });

    notificationEvents.emit(NOTIFICATION_EVENTS.RESERVATION_CONFIRMED, {
      userId: buyerId,
      message: 'Your reservation has been confirmed',
      data: { reservationId },
    });

    return updated;
  }

  async listMyReservations(buyerId: string) {
    return this.prisma.reservation.findMany({
      where: { buyerId },
      include: { pet: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
