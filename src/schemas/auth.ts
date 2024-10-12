import { z } from 'zod'
import { userSchema } from './user'

// User registration
export const registerUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type RegisterUserSchema = z.infer<typeof registerUserSchema>

// User login
export const loginUserSchema = userSchema.omit({
  id: true,
  username: true,
  createdAt: true,
  updatedAt: true
})
export type LoginUserSchema = z.infer<typeof loginUserSchema>
