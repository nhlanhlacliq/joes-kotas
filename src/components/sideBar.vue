<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Button from './ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <!-- Sidebar -->
  <div
    class="flex flex-col justify-between w-full bg-foreground dark:bg-foreground/10 text-background dark:text-foreground max-w-56 p-6"
  >
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">🍞 Joes Kotas</h2>
      <p class="">Hello, {name}</p>
      <p class="opacity-50">
        lorem ipsum etae et dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </p>
    </div>
    <Button @click="handleLogout"> 🚪 Logout </Button>
  </div>
</template>
