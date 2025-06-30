import { z } from 'zod'

export const SubscriberSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  createdAt: z.date().optional(),
})

export const CreateSubscriberSchema = SubscriberSchema.omit({
  id: true,
  createdAt: true,
})

export const UpdateSubscriberSchema = SubscriberSchema.partial().omit({
  createdAt: true,
})

export type Subscriber = z.infer<typeof SubscriberSchema>
export type CreateSubscriber = z.infer<typeof CreateSubscriberSchema>
export type UpdateSubscriber = z.infer<typeof UpdateSubscriberSchema>