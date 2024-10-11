import axios from '@/api/axios'

export const fetchInventory = async () => {
  return await axios.get('/inventory')
}

export const createInventoryItem = async (item) => {
  return await axios.post('/inventory', item)
}

export const updateInventoryItem = async (id: number, item) => {
  return await axios.put(`/inventory/${id}`, item)
}

export const deleteInventoryItem = async (id: number) => {
  return await axios.delete(`/inventory/${id}`)
}
