import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Itinerary } from './entities/itinerary.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Itinerary)
    private itineraryRepository: Repository<Itinerary>,
  ) {}

  getItineraries() {
    return this.itineraryRepository.find();
  }

  createItinerary(itinerary: CreateItineraryDto) {
    const newItinerary = this.itineraryRepository.create(itinerary);
    return this.itineraryRepository.save(newItinerary);
  }

  async updateItinerary(data: {
    id: string;
    updatedItinerary: UpdateItineraryDto;
  }): Promise<Itinerary> {
    const { id, updatedItinerary } = data;

    const itinerary = await this.itineraryRepository.findOne({
      where: {
        id,
      },
    });

    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }

    // Validate and update fields
    if (updatedItinerary.ticketPrice < 0) {
      throw new BadRequestException('Price must be a positive value');
    }

    await this.itineraryRepository.update(itinerary.id, updatedItinerary);

    return itinerary;
  }

  async searchItinerariesByCities(cities: {
    originCity: string;
    destinationCity: string;
  }): Promise<Itinerary[]> {
    // Logic to search itineraries by origin and destination cities in the repository
    const { originCity, destinationCity } = cities;

    const itineraries = await this.itineraryRepository.find({
      where: {
        originCity,
        destinationCity,
      },
    });

    if (!itineraries || itineraries.length === 0) {
      throw new NotFoundException(
        'No itineraries were found available for the specified cities.',
      );
    }

    return itineraries;
  }
}
