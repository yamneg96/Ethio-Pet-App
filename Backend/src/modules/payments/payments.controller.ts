import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  initiate(@CurrentUser() user: { id: string }, @Body() dto: InitiatePaymentDto) {
    return this.paymentsService.initiatePayment(user.id, dto.reservationId);
  }

  @Post('verify')
  verify(@CurrentUser() user: { id: string }, @Body() dto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(user.id, dto.paymentId);
  }
}
