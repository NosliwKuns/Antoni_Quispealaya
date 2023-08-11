import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    type: Number,
    description:'Seat Number',
  })
  @IsNotEmpty()
  @IsNumber()
  seatNumber: number

  @ApiProperty({
    type: String,
    description:'Seat Type',
  })
  @IsNotEmpty()
  @IsString()
  seatType: string

  @ApiProperty({
    type: String,
    description:'User Id',
  })
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty({
    type: String,
    description:'Itinerary Id',
  })
  @IsNotEmpty()
  @IsString()
  itineraryId: string

  @ApiProperty({
    type: String,
    description:'Bus Id',
  })
  @IsNotEmpty()
  @IsString()
  busId: string
}