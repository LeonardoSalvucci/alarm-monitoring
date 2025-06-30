import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { SubscriberDto } from './dto/subscriber.dto';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    const newSubscriber =
      await this.subscriberRepository.save(createSubscriberDto);
    // Type the parse result explicitly to avoid 'any' return type
    return SubscriberDto.schema.parse(newSubscriber) as SubscriberDto;
  }

  async findAll() {
    const subscribers = await this.subscriberRepository.find({
      relations: ['centralStations'],
    });
    if (subscribers.length === 0) {
      return [];
    }
    // Type the parse result explicitly to avoid 'any' return type
    return subscribers.map(
      (subscriber) => SubscriberDto.schema.parse(subscriber) as SubscriberDto,
    );
  }

  async findOne(id: number): Promise<SubscriberDto | null> {
    const subscriber = await this.subscriberRepository.findOne({
      where: { id },
      relations: ['centralStations'],
    });

    if (!subscriber) {
      return null;
    }

    // Type the parse result explicitly to avoid 'any' return type
    return SubscriberDto.schema.parse(subscriber) as SubscriberDto;
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return await this.subscriberRepository.update({ id }, updateSubscriberDto);
  }

  async remove(id: number) {
    return await this.subscriberRepository.delete({ id });
  }
}
