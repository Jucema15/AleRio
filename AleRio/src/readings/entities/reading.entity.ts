import { Sensor } from 'src/sensors/entities/sensor.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'readings' })
export class Reading {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  reading_data: string;

  @Column()
  sensor_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  reading_date: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.readings)
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;

}
 