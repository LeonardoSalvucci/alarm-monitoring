// entities/Subscriber.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  //OneToMany,
} from 'typeorm';
// import { CentralStation } from './CentralStation';
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

  // @OneToMany(
  //   () => CentralStation,
  //   (centralStation) => centralStation.subscriber,
  // )
  // centralStations: CentralStation[];

  // @OneToMany(() => AlarmStack, (alarmStack) => alarmStack.subscriber)
  // alarmStacks: AlarmStack[];
}
