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

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  state: string;

  @OneToMany(() => Reading, (reading) => reading.sensor)
  readings: Reading[];

  @ManyToMany(() => UserEntitiy, (user) => user.sensors)
  users: UserEntitiy[];
}
