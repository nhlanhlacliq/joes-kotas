<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import {
  createInventoryItem,
  deleteInventoryItem,
  fetchInventory as fetchInventoryService,
  updateInventoryItem
} from '@/services/inventory'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonComponent from '../components/ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const inventory = ref([])

async function fetchInventory() {
  try {
    const response = await fetchInventoryService()
    inventory.value = response.data
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

function handleAddItem() {
  try {
    //TODO:
    const item = {
      name: 'Apple',
      isAvailable: true,
      count: 1
    }
    createInventoryItem(item)
    fetchInventory()
  } catch (error) {
    console.error(error)
    alert(error)
  }
}
// @ts-expect-error TODO: handle type
function handleUpdateItem(id: number, item) {
  // TODO:
  updateInventoryItem(id, item)
}

function handleDeleteItem(id: number) {
  try {
    deleteInventoryItem(id)
    fetchInventory()
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
  const response = await fetchInventory()
  // @ts-expect-error TODO: handle data type
  inventory.value = response?.data
})
</script>

<template>
  <main class="g-background text-foregound w-full h-screen flex flex-col p-6">
    <div class="flex justify-between w-full">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-foreground">Dashboard 🍞</h1>
      <ButtonComponent class="w-32" @click="handleLogout"> Logout </ButtonComponent>
    </div>
  </main>
</template>
