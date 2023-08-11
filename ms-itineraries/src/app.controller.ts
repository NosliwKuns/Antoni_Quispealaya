import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_Itineraries' })
  getItineraries() {
    return this.appService.getItineraries();
  }

  @MessagePattern('create_itinerary')
  createItinerary(itinerary: CreateItineraryDto) {
    return this.appService.createItinerary(itinerary);
  }

  @MessagePattern('update_itinerary')
  updateItinerary(data: { id: string; updatedItinerary: UpdateItineraryDto }) {
    return this.appService.updateItinerary(data);
  }

  @MessagePattern('search_itineraries_by_cities')
  searchItinerariesByCities(cities: {
    originCity: string;
    destinationCity: string;
  }) {
    return this.appService.searchItinerariesByCities(cities);
  }
}
