<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import EditInventoryItemForm from '@/components/editInventoryItemForm.vue'
import LoadingComponent from '@/components/loadingComponent.vue'
import NewInventoryItemForm from '@/components/newInventoryItemForm.vue'
import SheetComponent from '@/components/sheetComponent.vue'
import Input from '@/components/ui/inputComponent.vue'
import Label from '@/components/ui/labelComponent.vue'
import { dateSort, stringSort, timeAgo } from '@/lib/utils'
import type { InventoryItemSchema } from '@/schemas/inventory'
import { deleteInventoryItem, fetchInventory as fetchInventoryService } from '@/services/inventory'
import { useAuthStore } from '@/stores/auth'
import { useInventoryStore } from '@/stores/inventory'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import DropdownMenu from '../components/dropdownMenu.vue'
import DropdownMenuItem from '../components/drowdownMenuItem.vue'
import Sidebar from '../components/sideBar.vue'
import Button from '../components/ui/buttonComponent.vue'

const authStore = useAuthStore()
const router = useRouter()
const inventoryStore = useInventoryStore()

const inventory = ref<InventoryItemSchema[]>([])
const isFetching = ref(true)

const filteredInventory = ref<InventoryItemSchema[]>([])
const tableSearchValue = ref('')

const table = ref<HTMLElement | null>(null)

const isCreateSheetVisible = ref(false)
function closeCreateSheet() {
  isCreateSheetVisible.value = false
}

const isEditSheetVisible = ref(false)
function closeEditSheet() {
  isEditSheetVisible.value = false
}

async function fetchInventory() {
  try {
    isFetching.value = true
    const response = await fetchInventoryService()
    inventory.value = response.data
    filteredInventory.value = inventory.value
    isFetching.value = false
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

function handleDeleteItem(id: number) {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      deleteInventoryItem(id)
      fetchInventory()
    } catch (error) {
      console.error(error)
      alert(error)
    }
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

const sortBy = ref<string | number>('id')
const sortDescending = ref(false)

function handleSort(key: string | number) {
  if (key === sortBy.value) {
    sortDescending.value = !sortDescending.value
  } else {
    sortBy.value = key
    sortDescending.value = false
  }
  filteredInventory.value = filteredInventory.value.sort((a, b) => {
    if (sortDescending.value) {
      return key === 'name'
        ? stringSort(b[key], a[key])
        : key === 'updatedAt'
          ? dateSort(b[key], a[key])
          : // @ts-expect-error
            b[key] - a[key]
    }
    return key === 'name'
      ? stringSort(a[key], b[key])
      : key === 'updatedAt'
        ? dateSort(a[key], b[key])
        : // @ts-expect-error
          a[key] - b[key]
  })
}

const tableColumns = [
  {
    label: 'ID',
    key: 'id',
    sortable: true
  },
  {
    label: 'Name',
    key: 'name',
    sortable: true
  },
  {
    label: 'Inventory',
    key: 'count',
    sortable: true
  },
  {
    label: 'Available',
    key: 'isAvailable',
    sortable: true
  },
  {
    label: 'Last Updated',
    key: 'updatedAt',
    sortable: true
  },
  {
    label: '',
    key: 'actions',
    sortable: false
  }
]
</script>

<template>
  <main
    id="dashboard"
    class="bg-background text-foregound w-full h-screen flex border-x border-border"
  >
    <Sidebar />
    <!-- Dashboard -->
    <div class="flex flex-col gap-4 flex-grow p-6 text-foreground dark:bg-foreground/5">
      <h1 class="text-2xl font-bold border-b border-border/50 pb-6">Dashboard</h1>
      <h2 class="text-xl font-semibold">Inventory</h2>
      <div class="flex justify-end items-center gap-4">
        <!-- Search -->
        <div class="w-72 flex gap-4 items-center">
          <Label for="search" class="scale-150">🔍</Label>
          <Input id="search" placeholder="Search..." v-model="tableSearchValue" />
        </div>
        <!-- Add Item form-->
        <SheetComponent v-model:isVisible="isCreateSheetVisible">
          <template #trigger>
            <Button class="w-32" variant="dark"
              ><div class="flex gap-2 items-center">
                <span class="scale-150 -mt-1">+</span> New Item
              </div>
            </Button>
          </template>
          <template #content>
            <NewInventoryItemForm @closeSheet="closeCreateSheet" @data-created="fetchInventory" />
          </template>
        </SheetComponent>
      </div>

      <!-- Table -->
      <div ref="table" class="overflow-y-scroll my-3">
        <LoadingComponent
          v-if="isFetching"
          class="opacity-50"
          :style="{ paddingLeft: (table?.offsetWidth ? table.offsetWidth / 2 - 20 : 1) + 'px' }"
        />
        <p v-else-if="filteredInventory && filteredInventory.length === 0" class="text-center">
          No food items found.
        </p>
        <table v-else class="min-w-full table-auto rounded-lg divide-y divide-border/50">
          <thead class="sticky top-0 z-10 bg-foreground/15 text-foreground backdrop-blur-lg">
            <tr>
              <th
                v-for="column in tableColumns"
                :key="column.key"
                :class="{ 'cursor-pointer': column.sortable }"
                @click="column.sortable && handleSort(column.key)"
                class="text-left opacity-50 font-normal"
              >
                <div class="flex items-center gap-4 hover:bg-foreground/5 py-3 px-4 select-none">
                  {{ column.label }}
                  <div v-if="column.key === sortBy">
                    <transition name="rotate" mode="out-in">
                      <div v-if="sortDescending" class="rotate-0 font-bold">↑</div>
                      <div v-else class="rotate-180 font-bold">↑</div>
                    </transition>
                  </div>
                </div>
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
                    <SheetComponent v-model:isVisible="isEditSheetVisible">
                      <template #trigger>
                        <DropdownMenuItem
                          icon="🖉"
                          label="Edit"
                          @click="inventoryStore.setSelectedInventoryItem(item)"
                        />
                      </template>
                      <template #content>
                        <EditInventoryItemForm
                          @closeSheet="closeEditSheet"
                          @dataUpdated="fetchInventory"
                        />
                      </template>
                    </SheetComponent>
                    <div class="h-0.5 w-full bg-border/25" />
                    <DropdownMenuItem icon="🗑️" label="Delete" @click="handleDeleteItem(item.id)" />
                  </template>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="!isFetching && filteredInventory && filteredInventory.length >= 1"
          class="p-3 px-4 opacity-50"
        >
          {{ filteredInventory.length }} items.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 100ms ease-in-out;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(180deg);
}
</style>
