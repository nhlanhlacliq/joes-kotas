import axios from '@/api/axios'
import type { InventoryItemInputSchema } from '@/schemas/inventory'

export const fetchInventory = async () => {
  return await axios.get('/inventory')
}

export const createInventoryItem = async (item: InventoryItemInputSchema) => {
  return await axios.post('/inventory', item)
}

export const updateInventoryItem = async (id: number, item: InventoryItemInputSchema) => {
  return await axios.put(`/inventory/${id}`, item)
}

export const deleteInventoryItem = async (id: number) => {
  return await axios.delete(`/inventory/${id}`)
}
