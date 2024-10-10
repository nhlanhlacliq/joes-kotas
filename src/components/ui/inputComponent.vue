<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  placeholder?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

// syncs v-model value from parent with internal value
const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>

<template>
  <input
    :placeholder="placeholder"
    v-model="modelValue"
    class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-foreground/20 focus-visible:outline-none"
  />
</template>
