import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
  password: z.string().min(8, { message: 'Password is required (Minimum 8 characters)' }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// get current user
export const getCurrentUserSchema = userSchema.omit({
  password: true
})
export type GetCurrentUserSchema = z.infer<typeof getCurrentUserSchema>
