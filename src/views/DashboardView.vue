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
import DropdownMenu from '../components/dropdownMenu.vue'
import Sidebar from '../components/sideBar.vue'
import Button from '../components/ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const inventory = ref<InventoryItemSchema[]>([])
const isFetching = ref(true)

const filteredInventory = ref<InventoryItemSchema[]>([])
const tableSearchValue = ref('')

const table = ref<HTMLElement | null>(null)

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
    <Sidebar />
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
      <div ref="table" class="py-3 overflow-y-scroll">
        <LoadingComponent
          v-if="isFetching"
          class="opacity-50"
          :style="{ paddingLeft: (table?.offsetWidth ? table.offsetWidth / 2 - 20 : 1) + 'px' }"
        />
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
                <DropdownMenu>
                  <template #trigger>
                    <Button variant="ghost"
                      ><div class="flex items-center justify-center -translate-y-[18%] text-2xl">
                        ...
                      </div>
                    </Button>
                  </template>
                  <template #menu>
                    <!-- Dropdown Content -->
                    <div
                      @click.prevent=""
                      class="p-3 px-2 flex gap-3 cursor-pointer hover:bg-border/25"
                    >
                      <div>🖉</div>
                      <div>Edit</div>
                    </div>
                    <div class="h-0.5 w-full bg-border/25" />
                    <div
                      @click.prevent=""
                      class="p-3 px-2 flex gap-3 cursor-pointer hover:bg-border/25"
                    >
                      <div>🗑️</div>
                      <div>Delete</div>
                    </div>
                  </template>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
