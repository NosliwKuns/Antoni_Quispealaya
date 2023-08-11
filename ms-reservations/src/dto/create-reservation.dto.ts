import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  seatNumber: number
  @IsNotEmpty()
  @IsString()
  seatType: string
  @IsNotEmpty()
  @IsString()
  userId: string
  // amenities: string
  // @IsNotEmpty()
  // @IsString()
  @IsNotEmpty()
  @IsString()
  itineraryId: string
  @IsNotEmpty()
  @IsString()
  busId: string
}