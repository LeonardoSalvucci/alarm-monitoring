import { SubscriberSchemaWithCentralStations } from '@alarm-monitoring/schemas/subscriber';
import { createZodDto } from 'nestjs-zod';

export class SubscriberDto extends createZodDto(
  SubscriberSchemaWithCentralStations,
) {}
