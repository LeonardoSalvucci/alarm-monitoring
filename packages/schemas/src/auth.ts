import { UserRole } from 'user.ts';
import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  sub: z.object({
    id: z.number().int().positive(),
    role: z.nativeEnum(UserRole)
  })
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  type: z.literal('Bearer'),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export type LoginResponse = z.infer<typeof LoginResponseSchema>;