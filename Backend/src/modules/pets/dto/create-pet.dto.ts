import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsNumber()
  @Min(0)
  ageMonths: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}
