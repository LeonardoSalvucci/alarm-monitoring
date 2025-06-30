import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CsidZone } from './csid-zone.entity';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Entity('central_stations')
@Index(['csid'])
@Index(['subscriberId'])
export class CentralStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  csid: string;

  @Column({ name: 'subscriber_id' })
  subscriberId: number;

  @Column({ name: 'system_name', nullable: true })
  systemName: string;

  @Column({ nullable: true })
  partition: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.centralStations)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;

  @OneToMany(() => CsidZone, (csidZone) => csidZone.centralStation, {
    cascade: true,
  })
  csidZones: CsidZone[];
}
