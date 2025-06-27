import { z } from 'zod';

export enum UserRole {
  ADMIN = 'admin',
  DATAENTRY = 'dataentry',
  OPERATOR = 'operator',
}

const PasswordSchema = z.string().min(8, 'Password must be at least 8 characters long');

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().min(1, 'Name is required'),
  role: z.nativeEnum(UserRole).default(UserRole.OPERATOR),
})

export const CreateUserSchema = UserSchema.omit({ id: true }).extend({
  password: PasswordSchema,
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;