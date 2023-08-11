import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
  ) {}

  getAllBuses() {
    return this.busRepository.find();
  }

  createBus(bus: CreateBusDto) {
    const newBus = this.busRepository.create(bus);
    return this.busRepository.save(newBus);
  }

  getBusDetail(id: string) {
    return this.busRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateBus(data: {
    id: string;
    updatedBus: UpdateBusDto;
  }): Promise<Bus> {
    const { id, updatedBus } = data;

    const bus = await this.busRepository.findOne({
      where: {
        id,
      },
    });

    if (!bus) {
      throw new NotFoundException('Bus not found');
    }

    const newUpdatedBus = {
      plate: bus.plate,
      operator: updatedBus.operator,
      numberSeats: bus.numberSeats,
    };

    await this.busRepository.update(bus.id, newUpdatedBus);

    return bus;
  }

  deleteBus(id: string) {
    return this.busRepository.delete(id);
  }
}
