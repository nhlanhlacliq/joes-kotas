import type { LoginUserSchema, RegisterUserSchema } from '@/schemas/auth'
import { login as loginService, register as registerService } from '@/services/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref<string | null>(null)

  // Register
  async function register(credentials: RegisterUserSchema) {
    console.log('registering...')
    await registerService(credentials)
    // Log the user in automatically
    await login({ email: credentials.email, password: credentials.password })
  }

  // Login
  async function login(credentials: LoginUserSchema) {
    console.log('logging in...')
    const response = await loginService(credentials)
    token.value = response.data.token
    console.log(token.value)
    localStorage.setItem('token', token.value as string)
  }

  // Logout
  async function logout() {
    console.log('logging out...')
    token.value = null
    localStorage.removeItem('token')
  }

  // Initialize - check for token
  async function initialize() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      console.log('token found in localStorage:', token.value)

      router.push('/dashboard')
    }
  }

  return { token, register, login, logout, initialize }
})
