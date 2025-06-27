import { createZodDto } from 'nestjs-zod';

import { UserSchema } from '@alarm-monitoring/schemas/user';
export class UserDto extends createZodDto(UserSchema) {}
