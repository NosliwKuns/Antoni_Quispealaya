import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString  } from 'class-validator';

export class UpdateBusDto {

  @ApiProperty({
    type: String,
    description:'Operator',
  })
  @IsNotEmpty()
  @IsString()
  operator: string
}