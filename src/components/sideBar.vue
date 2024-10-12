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
    class="flex flex-col justify-between w-full bg-foreground dark:bg-foreground/10 text-background dark:text-foreground max-w-60 p-6"
  >
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">🍞 Joes Kotas</h2>
      <p class="">Hello, {name}</p>
      <p class="opacity-50">
        Use the search bar to quickly find items by name.
        <br />
        <br />
        You can also sort the table by clicking on the column headers.
        <br />
        <br />
        Click on the <span class="text-3xl -mb-10"> ... </span> button to edit or delete an item.
      </p>
    </div>
    <Button @click="handleLogout" variant="destructive"> 🚪 Logout </Button>
  </div>
</template>
