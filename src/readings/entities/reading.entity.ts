import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'readings' })
export class Reading {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  reading_data: string;

  @Column({ unique: true })
  reading_date: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.readings)
  sensor: Sensor;
}
