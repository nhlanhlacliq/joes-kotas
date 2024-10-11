import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import router from '../router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

// Request interceptor to add Authorization header if token exists (https://axios-http.com/docs/interceptors)
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for global error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()
    // If any response is unauthorized - Log user out and route to /
    if (error.response && error.response.status === 401) {
      authStore.logout()
      router.push('/')
    } else if (error.response && error.response.status === 403) {
      alert('You do not have permission to perform this action.')
    }
    return Promise.reject(error)
  }
)

export default instance
