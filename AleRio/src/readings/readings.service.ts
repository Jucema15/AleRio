import { Injectable } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { Reading } from './entities/reading.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readingRepository: Repository<Reading>,
  ) {}

  create(CreateReadingDto: CreateReadingDto) {
    const newReading = this.readingRepository.create({
      ...CreateReadingDto,
    });
    return this.readingRepository.save(newReading);
  }

  findAll() {
    return this.readingRepository.find();
  }

  
  update(id: number, updateReadingDto: UpdateReadingDto) {
    return this.readingRepository.update({ id }, { ...updateReadingDto });
  }
  
  remove(id: number) {
    return this.readingRepository.delete(id);
  }

  async findOne(sensor_id: number) {
    return this.readingRepository.findOne({
      where: { sensor_id },
      order: { id: 'DESC' }, // O usa la columna de fecha si tienes una, por ejemplo: createdAt: 'DESC'
    });
  }

  async findLastTen(sensor_id: number) {
  return this.readingRepository.find({
    where: { sensor_id },
    order: { id: 'DESC' }, // O usa createdAt: 'DESC' si tienes columna de fecha
    take: 10,
  });
}
 
}
