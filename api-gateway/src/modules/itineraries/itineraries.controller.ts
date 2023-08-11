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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@ApiTags('Itineraries')
@Controller('itineraries')
export class ItinerariesController {
  constructor(
    @Inject('ITINERARIES_SERVICE') private itinerary_transport: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Itineraries' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Itineraries OK' })
  getAllItineraries() {
    return this.itinerary_transport.send({ cmd: 'get_Itineraries' }, {});
  }

  @Post()
  @ApiOperation({ summary: 'Create Itinerary' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Created.' })
  createItinerary(@Body() newItinerary: CreateItineraryDto) {
    return this.itinerary_transport.send('create_itinerary', newItinerary);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Itinerary' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Updated.' })
  updateItinerary(@Param('id') id: string, @Body() updatedItinerary: UpdateItineraryDto) {
    return this.itinerary_transport
      .send('update_itinerary', { id, updatedItinerary })
      // .pipe(catchError(error => throwError(() =>)))
  }

  @Get('search/city')
  @ApiOperation({ summary: 'Search Itineraries by City' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Found.' })
  searchItinerariesByCities(
    @Query('originCity') originCity: string,
    @Query('destinationCity') destinationCity: string,
  ) {
    return this.itinerary_transport.send('search_itineraries_by_cities', {
      originCity,
      destinationCity,
    });
  }
}
