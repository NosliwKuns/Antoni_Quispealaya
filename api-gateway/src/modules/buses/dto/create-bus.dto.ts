import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Max,  } from 'class-validator';

export class CreateBusDto {
  @ApiProperty({
    type: String,
    description:'Plate',
  })
  @IsNotEmpty()
  @IsString()
  plate: string

  @ApiProperty({
    type: String,
    description:'Operator',
  })
  @IsNotEmpty()
  @IsString()
  operator: string

  @ApiProperty({
    type: Number,
    description:'Number of Seats',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(20, { message: 'The minimum number of seats is 20' })
  @Max(35, { message: 'The maximum number of seats is 35' })
  numberSeats: number
}