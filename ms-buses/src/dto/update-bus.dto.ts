import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusDto {
  @IsNotEmpty()
  @IsString()
  operator: string
}