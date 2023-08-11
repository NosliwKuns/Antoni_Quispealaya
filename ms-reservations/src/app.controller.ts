import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_all_reservations')
  getAllReservations() {
    return this.appService.getAllReservations();
  }

  @MessagePattern('create_reservation')
  createReservation(data: CreateReservationDto) {
    return this.appService.createReservation(data);
  }

  @MessagePattern('get_reservations_by_itinerary')
  getReservationsByItinerary(itineraryId: string) {
    return this.appService.getReservationsByItinerary(itineraryId);
  }

  @MessagePattern('get_reservations_by_bus')
  getReservationsByBus(busId: string) {
    return this.appService.getReservationsByBus(busId);
  }

  @MessagePattern('get_reservations_by_user')
  getReservationsByUser(userId: string) {
    return this.appService.getReservationsByUser(userId);
  }

  @MessagePattern('cancel_reservation')
  cancelReservation(id: string) {
    return this.appService.cancelReservation(id);
  }
}
