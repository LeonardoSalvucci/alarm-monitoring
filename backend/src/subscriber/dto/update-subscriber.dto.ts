import { UpdateSubscriberSchema } from '@alarm-monitoring/schemas/subscriber';
import { createZodDto } from 'nestjs-zod';

export class UpdateSubscriberDto extends createZodDto(UpdateSubscriberSchema) {}
