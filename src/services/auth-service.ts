import axios from '@/api/axios'

export const register = async (credentials) => {
  return await axios.post('/auth/register', credentials)
}

export const login = async (credentials) => {
  return await axios.post('/auth/login', credentials)
}

export const getCurrentUser = async () => {
  return await axios.get('/auth/me')
}
