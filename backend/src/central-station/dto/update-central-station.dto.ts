import { UpdateCentralStationSchema } from '@alarm-monitoring/schemas/central-station';
import { createZodDto } from 'nestjs-zod';

export class UpdateCentralStationDto extends createZodDto(
  UpdateCentralStationSchema,
) {}
