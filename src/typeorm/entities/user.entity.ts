import { Sensor } from 'src/sensors/entities/sensor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntitiy {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  comunication_option: string;

  @Column()
  comunication_dir: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  authStrategy: string;

}
