<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import LoadingComponent from '@/components/loadingComponent.vue'
import Input from '@/components/ui/inputComponent.vue'
import Label from '@/components/ui/labelComponent.vue'
import { timeAgo } from '@/lib/utils'
import type { InventoryItemSchema } from '@/schemas/inventory'
import {
  createInventoryItem,
  deleteInventoryItem,
  fetchInventory as fetchInventoryService,
  updateInventoryItem
} from '@/services/inventory'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../components/ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const inventory = ref<InventoryItemSchema[]>([])
const isFetching = ref(true)

const filteredInventory = ref<InventoryItemSchema[]>([])
const tableSearchValue = ref('')

async function fetchInventory() {
  try {
    isFetching.value = true
    const response = await fetchInventoryService()
    inventory.value = response.data
    isFetching.value = false
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
  await fetchInventory()
  filteredInventory.value = inventory.value
})

watch(tableSearchValue, () => {
  filteredInventory.value = inventory.value.filter((item) =>
    item.name.toLowerCase().includes(tableSearchValue.value.toLowerCase())
  )
})

const tableColumns = ['ID', 'Name', 'Inventory', 'Available', 'Last Updated', '']
</script>

<template>
  <main class="bg-background text-foregound w-full h-screen flex">
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
    <!-- Dashboard -->
    <div class="flex flex-col gap-3 flex-grow p-6 text-foreground dark:bg-foreground/5">
      <h1 class="text-2xl font-bold border-b border-border/50 pb-3">Dashboard</h1>
      <h2 class="text-xl font-semibold">Inventory</h2>
      <div class="flex justify-end items-center gap-6">
        <!-- Search -->
        <div class="w-72 flex gap-4 items-center">
          <Label for="search" class="scale-150">🔍</Label>
          <Input id="search" placeholder="Search..." v-model="tableSearchValue" />
        </div>
        <!-- Add Item -->
        <Button class="w-32" variant="dark"
          ><div class="flex gap-2 items-center">
            <span class="scale-150 -mt-1">+</span> New Item
          </div>
        </Button>
      </div>

      <!-- Table -->
      <div class="py-3 overflow-y-scroll">
        <LoadingComponent v-if="isFetching" class="text-center opacity-50" />
        <p v-else-if="filteredInventory && filteredInventory.length === 0" class="text-center">
          No food items found.
        </p>
        <table v-else class="min-w-full table-auto rounded-lg divide-y divide-border/50">
          <thead>
            <tr>
              <th
                v-for="column in tableColumns"
                :key="column"
                class="px-4 py-2 text-left opacity-50 font-normal"
              >
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr v-for="item in filteredInventory" :key="item.id">
              <td class="px-4 py-2 opacity-25">{{ item.id }}</td>
              <td class="px-4 py-2">{{ item.name }}</td>
              <td class="px-4 py-2">{{ item.count }}</td>
              <td class="px-4 py-2">
                {{ item.isAvailable ? 'Yes' : 'No' }}
              </td>
              <td class="px-4 py-2 opacity-50">
                {{ timeAgo(item.updatedAt) }}
              </td>
              <td class="px-4 py-2 flex gap-4 justify-end">
                <Button>Edit</Button>
                <Button variant="outline">🗑️</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
