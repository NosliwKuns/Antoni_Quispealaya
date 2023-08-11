import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateItineraryDto {
  @ApiProperty({
    type: String,
    description:'Origin city',
  })
  @IsNotEmpty()
  @IsString()
  originCity: string

  @ApiProperty({
    type: String,
    description:'Destination city',
  })
  @IsNotEmpty()
  @IsString()
  destinationCity: string

  @ApiProperty({
    type: String,
    description:'Departure time',
  })
  @IsNotEmpty()
  @IsString()
  departureTime: string

  @ApiProperty({
    type: String,
    description:'Arrival time',
  })
  @IsNotEmpty()
  @IsString()
  arrivalTime: string

  @ApiProperty({
    type: Number,
    description:'Ticket Price',
  })
  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number

  @ApiProperty({
    type: String,
    description:'Bus Id',
  })
  @IsNotEmpty()
  @IsString()
  busId: string
}