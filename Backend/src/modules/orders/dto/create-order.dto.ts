import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  reservationId: string;
}
