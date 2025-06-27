import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  sub: z.number().int().positive(),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  type: z.literal('Bearer'),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export type LoginResponse = z.infer<typeof LoginResponseSchema>;