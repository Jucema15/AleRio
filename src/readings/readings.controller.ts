import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post()
  create(@Body() createReadingDto: CreateReadingDto) {
    console.log(createReadingDto);
    return this.readingsService.create(createReadingDto);

  }

  @Get()
  findAll() {
    return this.readingsService.findAll();
  }

  @Get(':sensor_id')
  findOne(@Param('sensor_id') sensor_id: string) {
    return this.readingsService.findOne(+sensor_id);
  }

  @Get('last-ten/:sensor_id')
  findLastTen(@Param('sensor_id') sensor_id: string) {
    return this.readingsService.findLastTen(+sensor_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingsService.update(+id, updateReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingsService.remove(+id);
  }
}
