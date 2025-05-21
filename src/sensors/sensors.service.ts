import { Injectable } from '@nestjs/common';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  create(CreateSensorDto: CreateSensorDto) {
    const newSensor = this.sensorRepository.create({
      ...CreateSensorDto,
    });
    return this.sensorRepository.save(newSensor);
  }

  findAll() {
    return this.sensorRepository.find();
  }

  findOne(id: number) {
    return this.sensorRepository.findOneBy({ id: id });
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return this.sensorRepository.update({ id }, { ...updateSensorDto });
  }

  remove(id: number) {
    return this.sensorRepository.delete(id);
  }
}
