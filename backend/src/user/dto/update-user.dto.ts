import { createZodDto } from 'nestjs-zod';
import { UpdateUserSchema } from '@alarm-monitoring/schemas/user';

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
