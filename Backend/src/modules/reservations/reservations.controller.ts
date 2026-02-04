import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ConfirmReservationDto } from './dto/confirm-reservation.dto';

@ApiTags('reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  createReservation(@CurrentUser() user: { id: string }, @Body() dto: CreateReservationDto) {
    return this.reservationsService.createReservation(user.id, dto);
  }

  @Post('confirm')
  confirmReservation(@CurrentUser() user: { id: string }, @Body() dto: ConfirmReservationDto) {
    return this.reservationsService.confirmReservation(user.id, dto.reservationId);
  }

  @Get('me')
  listMyReservations(@CurrentUser() user: { id: string }) {
    return this.reservationsService.listMyReservations(user.id);
  }
}
