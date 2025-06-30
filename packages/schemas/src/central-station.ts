import { SubscriberSchema } from 'subscriber.ts';
import { z } from 'zod';

export const CsidZoneSchema = z.object({
  id: z.number().int().positive(),
  eventCode: z.number().int(),
  zoneNumber: z.number().int(),
  description: z.string(),
  createdAt: z.date(),
  deletedAt: z.date().nullable()
});

export const CentralStationSchema = z.object({
  id: z.number().int().positive(),
  csid: z.string().min(1).max(4),
  systemName: z.string(),
  partition: z.number().int(),
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
  csidZones: z.array(CsidZoneSchema).optional(),
  subscriber: SubscriberSchema
})

export const CsidZoneSchemaWithCentralStation = CsidZoneSchema.extend({
  centralStation: CentralStationSchema
});

export const CreateCsidZoneSchema = CsidZoneSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true
});
export const UpdateCsidZoneSchema = CsidZoneSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true
}).partial();

export const CreateCentralStationSchema = CentralStationSchema.omit({
  id: true,
  subscriber: true,
  createdAt: true,
  deletedAt: true
}).extend({
  csidZones: z.array(CreateCsidZoneSchema).optional()
});

export const UpdateCentralStationSchema = CentralStationSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  subscriber: true,
  csidZones: true
}).partial();

export type CsidZone = z.infer<typeof CsidZoneSchema>;
export type CreateCsidZone = z.infer<typeof CreateCsidZoneSchema>;
export type UpdateCsidZone = z.infer<typeof UpdateCsidZoneSchema>;
export type CentralStation = z.infer<typeof CentralStationSchema>;
export type CsidZoneWithCentralStation = z.infer<typeof CsidZoneSchemaWithCentralStation>;
export type CreateCentralStation = z.infer<typeof CreateCentralStationSchema>;
export type UpdateCentralStation = z.infer<typeof UpdateCentralStationSchema>;