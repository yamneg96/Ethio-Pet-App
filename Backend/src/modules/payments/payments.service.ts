import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentProvider } from './payment-provider.interface';
import { DummyPaymentProvider } from './dummy.provider';

@Injectable()
export class PaymentsService {
  private readonly provider: PaymentProvider;

  constructor(private readonly prisma: PrismaService) {
    this.provider = new DummyPaymentProvider();
  }

  async initiatePayment(buyerId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id: reservationId, buyerId },
      include: { pet: true },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.status !== 'CONFIRMED') throw new BadRequestException('Reservation not confirmed');

    const payment = await this.prisma.payment.create({
      data: {
        amount: reservation.pet.price,
        currency: 'ETB',
        reservationId: reservation.id,
        status: 'PENDING',
        provider: 'DUMMY',
      },
    });

    const providerResp = await this.provider.initiatePayment(payment.amount, payment.currency, { reservationId });

    return this.prisma.payment.update({
      where: { id: payment.id },
      data: { providerPaymentId: providerResp.providerPaymentId },
    });
  }

  async verifyPayment(buyerId: string, paymentId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { id: paymentId, reservation: { buyerId } },
      include: { reservation: true },
    });
    if (!payment) throw new NotFoundException('Payment not found');

    const result = await this.provider.verifyPayment(payment.providerPaymentId || '');

    const status = result.status === 'SUCCESS' ? 'PAID' : result.status === 'FAILED' ? 'FAILED' : 'PENDING';

    return this.prisma.payment.update({
      where: { id: payment.id },
      data: { status },
    });
  }
}
