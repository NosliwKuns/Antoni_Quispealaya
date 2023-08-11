import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { map } from 'rxjs';

@ApiTags('Buses')
@Controller('buses')
export class BusesController {

  constructor(
    @Inject('BUSES_SERVICE') private buses_transport: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Buses' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Buses OK' })
  getAllBuses() {
    return this.buses_transport.send('get_all_buses', {})
  }

  @Post()
  @ApiOperation({ summary: 'Create Bus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Created.' })
  createBus(@Body() bus: CreateBusDto) {
    return this.buses_transport.send('create_bus', bus)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Bus Detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Obtained.' })
  getBusDetail(@Param('id') id: string) {
    return this.buses_transport.send('get_bus_detail', id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Bus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Updated.' })
  updateBus(@Param('id') id: string, @Body() updatedBus: UpdateBusDto) {
    return this.buses_transport.send('update_bus', { id, updatedBus })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Bus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfully Deleted.' })
  deleteBus(@Param('id') id:string) {
    try {
      const result = this.buses_transport.send('delete_bus', id)

      return result.pipe(
        map(result => {
          if (result.affected === 0) {
            throw new NotFoundException(`Bus with ID ${id} not found`);
          }
          return { message: 'Bus deleted successfully' };
        })
      )
    } catch (error) {
      throw new InternalServerErrorException('Error deleting bus');
    }
  }
}
