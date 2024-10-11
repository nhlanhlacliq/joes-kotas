import axios from '@/api/axios'
import type { LoginUserSchema, RegisterUserSchema } from '@/schemas/auth'

export const register = async (credentials: RegisterUserSchema) => {
  return await axios.post('/auth/register', credentials)
}

export const login = async (credentials: LoginUserSchema) => {
  return await axios.post('/auth/login', credentials)
}

export const getCurrentUser = async () => {
  return await axios.get('/auth/me')
}

export const getAllUsers = async () => {
  return await axios.get('/users')
}
