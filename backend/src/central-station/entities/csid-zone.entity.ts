// entities/CsidZone.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CentralStation } from './central-station.entity';

@Entity('csidzones')
@Index(['eventCode', 'zoneNumber'], { unique: true })
export class CsidZone {
  @PrimaryGeneratedColumn()
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
