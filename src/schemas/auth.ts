import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
  password: z.string().min(8, { message: 'Password is required (Minimum 8 characters)' }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

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
