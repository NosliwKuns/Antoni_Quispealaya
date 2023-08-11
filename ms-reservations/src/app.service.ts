import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  getAllReservations() {
    return this.reservationRepository.find();
  }

  createReservation(data: CreateReservationDto) {

    let amenities: string;
    
    if (data.seatType === 'Turista') {
      amenities = `
        - Precio más económico.
        - Asientos cómodos y espaciosos.
        - Entretenimiento básico a bordo (revistas, música).
        - Refrigerios y bebidas estándar.`
    }

    if (data.seatType === 'Ejecutivo') {
      amenities =`
        - Precio intermedio.
        - Asientos más amplios y reclinables.
        - Entretenimiento avanzado a bordo (pantallas individuales, películas).
        - Comidas y bebidas de mejor calidad.
        - Acceso a salas VIP en terminales.
      `
    }

    if (data.seatType === 'Premium') {
      amenities = `
        - Asientos de lujo con mayor comodidad y espacio personal.
        - Servicio de mayordomo o asistente de vuelo.
        - Entretenimiento de alta gama y opciones personalizadas.
        - Comidas gourmet y selección de bebidas premium.
        - Prioridad en el abordaje y desembarque.
      `
    }

    const createReservation = {
      seatNumber: data.seatNumber,
      seatType: data.seatType,
      amenities,
      userId: data.userId,
      itineraryId: data.itineraryId,
      busId: data.busId
    }

    const newReservation = this.reservationRepository.create(createReservation)
    return this.reservationRepository.save(newReservation);
  }
  
  getReservationsByItinerary(itineraryId: string) {
    return this.reservationRepository.find({
      where: {
        itineraryId
      }
    });
  }

  getReservationsByBus(busId: string) {
    return this.reservationRepository.find({
      where: {
        busId
      }
    });
  }

  getReservationsByUser(userId: string) {
    return this.reservationRepository.find({
      where: {
        userId
      }
    });
  }

  cancelReservation(id: string) {
    return this.reservationRepository.delete(id);
  }
}
