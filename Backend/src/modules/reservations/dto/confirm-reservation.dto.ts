import { IsString } from 'class-validator';

export class ConfirmReservationDto {
  @IsString()
  reservationId: string;
}
