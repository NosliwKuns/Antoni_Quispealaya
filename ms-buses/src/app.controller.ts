import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_all_buses')
  getAllBuses() {
    return this.appService.getAllBuses();
  }

  @MessagePattern('create_bus')
  createBus(bus: CreateBusDto) {
    return this.appService.createBus(bus)
  }

  @MessagePattern('get_bus_detail')
  getBusDetail(id: string) {
    return this.appService.getBusDetail(id);
  }

  @MessagePattern('update_bus')
  updateBus(data: { id: string, updatedBus: UpdateBusDto}) {
    return this.appService.updateBus(data);
  }

  @MessagePattern('delete_bus')
  deleteBus(id: string) {
    return this.appService.deleteBus(id);
  }
}
