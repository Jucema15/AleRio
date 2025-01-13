import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntitiy } from './typeorm/entities/user.entity';
import { UsersModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';
import { Sensor } from './sensors/entities/sensor.entity';
import { ReadingsModule } from './readings/readings.module';
import { Reading } from './readings/entities/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [UserEntitiy, Sensor, Reading],
      synchronize: true,
    }),
    UsersModule,
    SensorsModule, 
    ReadingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
