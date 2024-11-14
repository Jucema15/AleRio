import { Reading } from 'src/readings/entities/reading.entity';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'sensors' })
export class Sensor {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { precision: 65, scale: 9 })
  lat: number;

  @Column('decimal', { precision: 65, scale: 9 })
  lng: number;

  @Column()
  state: string;

  @Column('decimal', { precision: 6, scale: 2 })
  red_umbral: number;

  @Column('decimal', { precision: 6, scale: 2 })
  yellow_umbral: number;

  @Column('decimal', { precision: 6, scale: 2 })
  green_umbral: number;

  @OneToMany(() => Reading, (reading) => reading.sensor)
  readings: Reading[];

  @ManyToMany(() => UserEntitiy, (user) => user.sensors)
  users: UserEntitiy[];
}
