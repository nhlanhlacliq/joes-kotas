<script setup lang="ts">
import { createInventoryItem } from '@/services/inventory'
import { ref } from 'vue'
import Button from './ui/buttonComponent.vue'
import Input from './ui/inputComponent.vue'
import Label from './ui/labelComponent.vue'

const emit = defineEmits(['closeSheet', 'dataCreated'])

const isPending = ref()

const name = ref('')
const count = ref(0)
const isAvailable = ref(false)

async function handleSubmit() {
  const body = {
    name: name.value,
    count: count.value,
    isAvailable: isAvailable.value
  }

  try {
    isPending.value = true
    createInventoryItem(body)
    emit('dataCreated')
    isPending.value = false
    emit('closeSheet')
  } catch (error) {
    console.error(error)
    alert(error)
  }
}
</script>

<template>
  <form class="flex flex-col gap-4 p-6 h-full" @submit.prevent="handleSubmit">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-semibold pb-2">New Food Item</h2>
      <p class="text-sm text-foreground/50 mb-4">
        Enter the details below to create a new food item.
      </p>
    </div>

    <!-- Inputs -->
    <div class="flex flex-col gap-4">
      <div>
        <Label for="name">Name</Label>
        <Input id="name" v-model="name" type="text" placeholder="Eggs" required />
      </div>
      <div>
        <Label for="count">Inventory</Label>
        <Input id="count" v-model="count" type="number" placeholder="0" min="0" required />
      </div>
      <div class="flex items-center gap-2 py-2">
        <input
          id="available"
          v-model="isAvailable"
          type="checkbox"
          checked
          class="rounded border-border/50 size-4 text-black"
        />
        <Label for="available" class="mb-0.5 text-md">Available?</Label>
      </div>
    </div>
    <div class="flex flex-grow flex-col gap-4 justify-end">
      <Button class="w-full mt-4" type="submit" variant="dark" :disabled="isPending">
        Create
      </Button>
      <Button
        class="w-full"
        type="button"
        variant="outline"
        @click="emit('closeSheet')"
        :disabled="isPending"
      >
        Cancel
      </Button>
    </div>
  </form>
</template>
