

export enum AlarmEventType {
  E = 'E',
  R = 'R',
}

export enum AlarmPriority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
}

// entities/User.ts




// entities/CentralStation.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Subscriber } from './Subscriber';
import { CsidZone } from './CsidZone';

@Entity('centralstations')
@Index(['csid'])
@Index(['subscriberId'])
export class CentralStation {
  @PrimaryColumn()
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

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.centralStations)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;

  @OneToMany(() => CsidZone, (csidZone) => csidZone.centralStation)
  csidZones: CsidZone[];
}

// entities/CsidZone.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CentralStation } from './CentralStation';

@Entity('csidzones')
@Index(['eventCode', 'zoneNumber'], { unique: true })
export class CsidZone {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'centralstation_id' })
  centralstationId: number;

  @Column({ name: 'event_code' })
  eventCode: number;

  @Column({ name: 'zone_number' })
  zoneNumber: number;

  @Column({ name: 'zone_name', nullable: true })
  zoneName: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => CentralStation, (centralStation) => centralStation.csidZones)
  @JoinColumn({ name: 'centralstation_id' })
  centralStation: CentralStation;
}

// entities/Alarm.ts
import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
import { AlarmEventType, AlarmPriority } from '../enums';

@Entity('alarms')
@Index(['eventCode'], { unique: true })
export class Alarm {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AlarmEventType,
    name: 'event_type',
    nullable: true,
  })
  eventType: AlarmEventType;

  @Column({ name: 'event_code', nullable: true })
  eventCode: number;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: AlarmPriority,
    nullable: true,
  })
  priority: AlarmPriority;
}

// entities/AlarmHistory.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { AlarmEventType } from '../enums';
import { AlarmHistoryDetail } from './AlarmHistoryDetail';

@Entity('alarmhistory')
@Index(['csid'])
@Index(['subscriberName'])
@Index(['processedAt'])
@Index(['createdAt'])
export class AlarmHistory {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  csid: string;

  @Column({
    type: 'enum',
    enum: AlarmEventType,
    name: 'event_type',
    nullable: true,
  })
  eventType: AlarmEventType;

  @Column({ name: 'event_code', nullable: true })
  eventCode: number;

  @Column({ name: 'event_description', nullable: true })
  eventDescription: string;

  @Column({ name: 'subscriber_name', nullable: true })
  subscriberName: string;

  @Column({ name: 'subscriber_address', nullable: true })
  subscriberAddress: string;

  @Column({ name: 'subscriber_city', nullable: true })
  subscriberCity: string;

  @Column({ name: 'processed_at', nullable: true })
  processedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => AlarmHistoryDetail, (detail) => detail.alarmHistory)
  details: AlarmHistoryDetail[];
}

// entities/AlarmStack.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AlarmEventType } from '../enums';
import { Subscriber } from './Subscriber';
import { User } from './User';

@Entity('alarmstack')
export class AlarmStack {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'subscriber_id' })
  subscriberId: number;

  @Column({ nullable: true })
  csid: string;

  @Column({
    type: 'enum',
    enum: AlarmEventType,
    name: 'event_type',
    nullable: true,
  })
  eventType: AlarmEventType;

  @Column({ name: 'event_code', nullable: true })
  eventCode: number;

  @Column({ name: 'block_by', nullable: true })
  blockBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.alarmStacks)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;

  @ManyToOne(() => User, (user) => user.blockedAlarms)
  @JoinColumn({ name: 'block_by' })
  blockByUser: User;
}

// entities/AlarmHistoryDetail.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AlarmHistory } from './AlarmHistory';
import { User } from './User';

@Entity('alarmhistorydetail')
export class AlarmHistoryDetail {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'alarmhistory_id' })
  alarmhistoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AlarmHistory, (alarmHistory) => alarmHistory.details)
  @JoinColumn({ name: 'alarmhistory_id' })
  alarmHistory: AlarmHistory;

  @ManyToOne(() => User, (user) => user.alarmHistoryDetails)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
