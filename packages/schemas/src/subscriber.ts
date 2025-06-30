import { CentralStationSchema } from 'central-station.ts'
import { z } from 'zod'

export const SubscriberSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  createdAt: z.date().optional(),
})

const CentralStationWithoutSubscriber = z.lazy(() => CentralStationSchema.omit({
  subscriber: true,
}))

export const SubscriberSchemaWithCentralStations = SubscriberSchema.extend({
  centralStations: z.array(CentralStationWithoutSubscriber).optional().default([]),
})

export const CreateSubscriberSchema = SubscriberSchema.omit({
  id: true,
  createdAt: true,
})

export const UpdateSubscriberSchema = SubscriberSchema.partial().omit({
  createdAt: true,
})

export type Subscriber = z.infer<typeof SubscriberSchema>
export type SubscriberWithCentralStations = z.infer<typeof SubscriberSchemaWithCentralStations>
export type CreateSubscriber = z.infer<typeof CreateSubscriberSchema>
export type UpdateSubscriber = z.infer<typeof UpdateSubscriberSchema>