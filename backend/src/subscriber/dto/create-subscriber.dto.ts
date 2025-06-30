import { CreateSubscriberSchema } from '@alarm-monitoring/schemas/subscriber';
import { createZodDto } from 'nestjs-zod';

export class CreateSubscriberDto extends createZodDto(CreateSubscriberSchema) {}
