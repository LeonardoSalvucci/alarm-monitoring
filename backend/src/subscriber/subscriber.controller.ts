import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@alarm-monitoring/schemas/user';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SubscriberDto } from './dto/subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';

@Roles(UserRole.ADMIN, UserRole.DATAENTRY)
@UseGuards(RolesGuard)
@ApiTags('subscriber')
@Controller('subscriber')
@UseGuards(JwtAuthGuard)
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @ApiOkResponse({
    description: 'Subscriber created successfully',
    type: Subscriber,
  })
  async create(@Body() createSubscriberDto: CreateSubscriberDto) {
    const subscriber = await this.subscriberService.create(createSubscriberDto);
    return SubscriberDto.schema.parse(subscriber);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all subscribers',
    type: SubscriberDto,
    isArray: true,
  })
  async findAll() {
    const subscribers = await this.subscriberService.findAll();
    return subscribers.map((subscriber) =>
      SubscriberDto.schema.parse(subscriber),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Subscriber found successfully',
    type: SubscriberDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const subscriber = await this.subscriberService.findOne(id);
    return subscriber
      ? SubscriberDto.schema.parse(subscriber)
      : new NotFoundException(`Subscriber not found`);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Subscriber updated successfully',
    type: UpdateSubscriberDto,
  })
  @HttpCode(204)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    await this.subscriberService.update(id, updateSubscriberDto);
    return;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.subscriberService.remove(id);
    return;
  }
}
