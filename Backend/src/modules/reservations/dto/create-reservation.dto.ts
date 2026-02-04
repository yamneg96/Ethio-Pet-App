import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum DeliveryMethod {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

export class CreateReservationDto {
  @IsString()
  petId: string;

  @IsEnum(DeliveryMethod)
  deliveryMethod: DeliveryMethod;

  @IsOptional()
  @IsString()
  deliveryAddress?: string;
}
