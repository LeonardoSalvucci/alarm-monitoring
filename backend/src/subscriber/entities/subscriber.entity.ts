// entities/Subscriber.ts
import { CentralStation } from 'src/central-station/entities/central-station.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
// import { AlarmStack } from './AlarmStack';

@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(
    () => CentralStation,
    (centralStation) => centralStation.subscriber,
    { cascade: true },
  )
  centralStations: CentralStation[];

  // @OneToMany(() => AlarmStack, (alarmStack) => alarmStack.subscriber)
  // alarmStacks: AlarmStack[];
}
