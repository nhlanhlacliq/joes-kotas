import { login as loginService, register as registerService } from '@/services/auth-service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  async function register(credentials) {
    console.log('registering...')
    await registerService(credentials)
    // Log the user in automatically
    await login({ email: credentials.email, password: credentials.password })
  }

  async function login(credentials) {
    console.log('logging in...')
    const response = await loginService(credentials)
    token.value = response.data.token
    console.log(token.value)
    localStorage.setItem('token', token.value as string)
  }

  async function logout() {
    console.log('logging out...')
    token.value = null
    localStorage.removeItem('token')
    console.log(localStorage)
  }

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
