import type { InventoryItemSchema } from '@/schemas/inventory'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const selectedInventoryItem = ref<InventoryItemSchema | null>(null)

  function setSelectedInventoryItem(item: InventoryItemSchema | null) {
    selectedInventoryItem.value = item
  }

  return {
    selectedInventoryItem,
    setSelectedInventoryItem
  }
})
