import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSellerProfileDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
