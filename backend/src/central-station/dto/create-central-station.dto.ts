import { createZodDto } from 'nestjs-zod';
import { CreateCentralStationSchema } from '@alarm-monitoring/schemas/central-station';

export class CreateCentralStationDto extends createZodDto(
  CreateCentralStationSchema,
) {}
