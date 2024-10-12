import axios from '@/api/axios'
import type { LoginUserSchema, RegisterUserSchema } from '@/schemas/auth'

export const register = async (credentials: RegisterUserSchema) => {
  return await axios.post('/auth/register', credentials)
}

export const login = async (credentials: LoginUserSchema) => {
  return await axios.post('/auth/login', credentials)
}
