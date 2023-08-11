import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateItineraryDto {
  @IsNotEmpty()
  @IsString()
  originCity: string
  @IsNotEmpty()
  @IsString()
  destinationCity: string
  @IsNotEmpty()
  @IsString()
  departureTime: string
  @IsNotEmpty()
  @IsString()
  arrivalTime: string
  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number
  @IsNotEmpty()
  @IsString()
  busId: string
}