import axios from '@/api/axios'
import { parseZodError } from '@/lib/utils'
import type { InventoryItemInputSchema, InventoryItemSchema } from '@/schemas/inventory'

export const fetchInventory = async () => {
  try {
    return await axios.get<InventoryItemSchema[]>('/inventory')
  } catch (error) {
    alert(parseZodError(error, 'Failed to fetch inventory'))
  }
}

export const createInventoryItem = async (item: InventoryItemInputSchema) => {
  try {
    return await axios.post<InventoryItemInputSchema>('/inventory', item)
  } catch (error) {
    alert(parseZodError(error, 'Failed to create item'))
  }
}

export const updateInventoryItem = async (id: number, item: InventoryItemInputSchema) => {
  try {
    return await axios.put<InventoryItemInputSchema>(`/inventory/${id}`, item)
  } catch (error) {
    alert(parseZodError(error, 'Failed to update item'))
  }
}

export const deleteInventoryItem = async (id: number) => {
  try {
    return await axios.delete(`/inventory/${id}`)
  } catch (error) {
    alert(parseZodError(error, 'Failed to delete item'))
  }
}
