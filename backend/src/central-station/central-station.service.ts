import { Injectable } from '@nestjs/common';
import { CreateCentralStationDto } from './dto/create-central-station.dto';
import { UpdateCentralStationDto } from './dto/update-central-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CentralStation } from './entities/central-station.entity';
import { Repository } from 'typeorm';
import { SubscriberService } from 'src/subscriber/subscriber.service';

@Injectable()
export class CentralStationService {
  constructor(
    @InjectRepository(CentralStation)
    private centralStationRepository: Repository<CentralStation>,
    private subscriberService: SubscriberService,
  ) {}
  async create(id: number, createCentralStationDto: CreateCentralStationDto) {
    // id is the subscriberId
    const subscriber = await this.subscriberService.findOne(id);
    if (!subscriber) {
      throw new Error(`Subscriber with id ${id} not found`);
    }
    return await this.centralStationRepository.save({
      ...createCentralStationDto,
      subscriber_id: id,
    });
  }

  findAll() {
    return this.centralStationRepository.find();
  }

  async findByCSID(csid: string) {
    const centralStation = await this.centralStationRepository.findOne({
      where: { csid },
      relations: ['subscriber', 'csidZones'],
    });
    if (!centralStation) {
      throw new Error(`Central Station with CSID ${csid} not found`);
    }
    return centralStation;
  }

  findOne(id: number) {
    return this.centralStationRepository.findOne({
      where: { id },
      relations: ['subscriber', 'csidZones'],
    });
  }

  update(id: number, updateCentralStationDto: UpdateCentralStationDto) {
    return this.centralStationRepository.update(
      { id },
      updateCentralStationDto,
    );
  }

  remove(id: number) {
    return this.centralStationRepository.delete({ id });
  }
}
