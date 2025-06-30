import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    return await this.subscriberRepository.save(createSubscriberDto);
  }

  async findAll() {
    return await this.subscriberRepository.find();
  }

  async findOne(id: number) {
    return await this.subscriberRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return await this.subscriberRepository.update({ id }, updateSubscriberDto);
  }

  async remove(id: number) {
    return await this.subscriberRepository.delete({ id });
  }
}
