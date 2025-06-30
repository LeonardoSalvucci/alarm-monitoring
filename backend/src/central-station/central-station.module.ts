import { Module } from '@nestjs/common';
import { CentralStationService } from './central-station.service';
import { CentralStationController } from './central-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentralStation } from './entities/central-station.entity';
import { CsidZone } from './entities/csid-zone.entity';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CentralStation, CsidZone, Subscriber])],
  controllers: [CentralStationController],
  providers: [CentralStationService, SubscriberService],
})
export class CentralStationModule {}
