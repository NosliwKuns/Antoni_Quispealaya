import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty()
  @IsString()
  plate: string
  @IsNotEmpty()
  @IsString()
  operator: string
  @IsNotEmpty()
  @IsNumber()
  numberSeats: number
}