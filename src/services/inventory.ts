import axios from '@/api/axios'
import type { InventoryItemInputSchema, InventoryItemSchema } from '@/schemas/inventory'

export const fetchInventory = async () => {
  return await axios.get<InventoryItemSchema[]>('/inventory')
}

export const createInventoryItem = async (item: InventoryItemInputSchema) => {
  return await axios.post<InventoryItemInputSchema>('/inventory', item)
}

export const updateInventoryItem = async (id: number, item: InventoryItemInputSchema) => {
  return await axios.put<InventoryItemInputSchema>(`/inventory/${id}`, item)
}

export const deleteInventoryItem = async (id: number) => {
  return await axios.delete(`/inventory/${id}`)
}
