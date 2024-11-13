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
      reading_date: new Date(),
    });
    return this.readingRepository.save(newReading);
  }

  findAll() {
    return this.readingRepository.find();
  }

  findOne(id: number) {
    return this.readingRepository.findOneBy({ id: id });
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return this.readingRepository.update({ id }, { ...updateReadingDto });
  }

  remove(id: number) {
    return this.readingRepository.delete(id);
  }
}
