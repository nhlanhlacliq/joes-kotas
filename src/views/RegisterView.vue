<script setup lang="ts">
import MainContainer from '@/components/mainContainer.vue'
import Button from '@/components/ui/buttonComponent.vue'
import Card from '@/components/ui/cardComponent.vue'
import Input from '@/components/ui/inputComponent.vue'
import Label from '@/components/ui/labelComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const passwordShow = ref(false)

const email = ref('')
const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleRegister() {
  try {
    await authStore.register({
      email: email.value,
      username: username.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
    //@ts-expect-error TODO: handle type
    if (error.response && error.response.data && error.response.data.error) {
      //@ts-expect-error
      errorMessage.value = error.response.data.error
    } else {
      errorMessage.value = 'An error occurred during registration.'
    }
  }
}
</script>

<template>
  <MainContainer>
    <Card class="w-full max-w-sm p-6 shadow-sm">
      <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
        <div>
          <h2 class="text-2xl font-semibold pb-2">Register</h2>
          <p class="text-sm text-foreground/50 mb-4">
            Enter your details below to create your account.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
          </div>
          <div>
            <Label for="username">Username</Label>
            <Input id="username" v-model="username" placeholder="Chef Cooks" required />
          </div>
          <div>
            <Label for="password">Password</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="passwordShow ? 'text' : 'password'"
                placeholder="Password"
                minlength="8"
                required
              />
              <div
                class="absolute right-2 bottom-0 hover:bg-border p-2 cursor-pointer"
                @click="passwordShow = !passwordShow"
              >
                👁️
              </div>
            </div>
          </div>
          <Button class="w-full mt-4" type="submit"> Register </Button>
          <Button class="w-full" variant="outline" @click="router.push('/')"> Cancel </Button>
        </div>
      </form>
      <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
    </Card>
  </MainContainer>
</template>
