import { z } from 'zod'

export const inventoryItemCompleteSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
  count: z.number().int().min(0, { message: 'Count cannot be negative' }),
  isAvailable: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})
export type InventoryItemSchema = z.infer<typeof inventoryItemCompleteSchema>

const inventoryItemInputSchema = inventoryItemCompleteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
export type InventoryItemInputSchema = z.infer<typeof inventoryItemInputSchema>
