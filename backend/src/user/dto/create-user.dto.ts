import { createZodDto } from 'nestjs-zod';

import { CreateUserSchema } from '@alarm-monitoring/schemas/user';
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
