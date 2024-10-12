<script setup lang="ts">
import { timeAgo } from '@/lib/utils'
import type { GetCurrentUserSchema } from '@/schemas/user'
import { getCurrentUser } from '@/services/user'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from './ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const isFetching = ref(false)
const user = ref<GetCurrentUserSchema | null>(null)

async function fetchUser() {
  try {
    isFetching.value = true
    const response = await getCurrentUser()
    user.value = response.data
    isFetching.value = false
    console.log(user.value)
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

onMounted(async () => {
  await fetchUser()
})
</script>

<template>
  <!-- Sidebar -->
  <div
    class="flex flex-col justify-between w-full bg-foreground dark:bg-foreground/10 text-background dark:text-foreground max-w-60 p-6"
  >
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">🍞 Joes Kotas</h2>
      <div class="w-full h-[1px] bg-border/25 dark:bg-foreground/15 my-1" />
      <transition name="slide" mode="out-in">
        <div v-if="user">
          <p class="capitalize font-semibold pb-0.5">Hello, {{ user.username! }}!</p>
          <p class="text-sm opacity-50">User since: {{ timeAgo(user.createdAt!) }} 🙂</p>
        </div>
      </transition>
      <transition name="slideDown" mode="out-in">
        <div v-if="user" class="w-full h-[1px] bg-border/25 dark:bg-foreground/15 my-1" />
      </transition>
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
    <Button @click="handleLogout" variant="destructive" class="flex gap-2 mb-6">
      <div class="text-xl font-bold">⍇</div>
      Logout
    </Button>
  </div>
</template>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.75s ease all;
}

.slideDown-enter-from,
.slideDown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.slideDown-enter-active,
.slideDown-leave-active {
  transition: 0.5s ease all;
}
</style>
