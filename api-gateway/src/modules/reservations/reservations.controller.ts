import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservatio.dto';
import { map } from 'rxjs';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(
    @Inject('RESERVATIONS_SERVICE') private reservation_transport: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Get Reservations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reservations OK' })
  @Get()
  GetAllReservations() {
    return this.reservation_transport.send('get_all_reservations', {});
  }

  @ApiOperation({ summary: 'Create Reservation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Created.' })
  @Post()
  CreateReservation(@Body() data: CreateReservationDto) {
    return this.reservation_transport.send('create_reservation', data);
  }

  @ApiOperation({ summary: 'Get Reservation by Itinerary Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Obtained.' })
  @Get('itinerary/:id')
  getReservationsByItinerary(@Param('id') itineraryId: string) {
    return this.reservation_transport.send(
      'get_reservations_by_itinerary',
      itineraryId,
    );
  }

  @ApiOperation({ summary: 'Get Reservation by Bus Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Obtained.' })
  @Get('bus/:id')
  getReservationsByBus(@Param('id') busId: string) {
    return this.reservation_transport.send('get_reservations_by_bus', busId);
  }

  @ApiOperation({ summary: 'Get Reservation by User Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Obtained.' })
  @Get('user/:id')
  getReservationsByUser(@Param('id') userId: string) {
    return this.reservation_transport.send('get_reservations_by_user', userId);
  }

  @ApiOperation({ summary: 'Cancel Reservation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Canceled.' })
  @Delete(':id')
  cancelReservation(@Param('id') id: string) {
    try {
      const result = this.reservation_transport.send('cancel_reservation', id);

      return result.pipe(
        map((result) => {
          if (result.affected === 0) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
          }
          return { message: 'Reservation canceled successfully' };
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('Error canceling reservation');
    }
  }
}
