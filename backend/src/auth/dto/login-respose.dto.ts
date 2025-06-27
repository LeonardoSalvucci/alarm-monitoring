import { createZodDto } from 'nestjs-zod';
import { LoginResponseSchema } from '@alarm-monitoring/schemas/auth';

export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}
