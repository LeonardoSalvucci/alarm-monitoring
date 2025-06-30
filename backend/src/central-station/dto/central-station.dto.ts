import { CentralStationSchema } from '@alarm-monitoring/schemas/central-station';
import { createZodDto } from 'nestjs-zod';

export class CentralStationDto extends createZodDto(CentralStationSchema) {}
