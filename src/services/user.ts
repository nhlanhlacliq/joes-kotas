import axios from '@/api/axios'
import type { GetCurrentUserSchema } from '@/schemas/user'

export const getCurrentUser = async () => {
  return await axios.get<GetCurrentUserSchema>('/user')
}

// export const getAllUsers = async () => {
//   return await axios.get('/users')
// }
