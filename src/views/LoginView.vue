<script setup lang="ts">
import MainContainer from '@/components/mainContainer.vue'
import Button from '@/components/ui/buttonComponent.vue'
import Card from '@/components/ui/cardComponent.vue'
import Input from '@/components/ui/inputComponent.vue'
import Label from '@/components/ui/labelComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const passwordShow = ref(false)

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
    alert(error)
  }
}
</script>

<template>
  <MainContainer>
    <Card class="w-full max-w-sm p-6 shadow-sm">
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <h2 class="text-2xl font-semibold pb-2">Login</h2>
          <p class="text-sm text-foreground/50 mb-4">
            Enter your email below to login to your account.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
          </div>
          <div>
            <Label for="password">Password</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="passwordShow ? 'text' : 'password'"
                minlength="8"
                placeholder="Password"
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
          <Button class="w-full mt-4" type="submit"> Login </Button>
          <Button class="w-full" type="button" variant="outline" @click="router.push('/')">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  </MainContainer>
</template>
