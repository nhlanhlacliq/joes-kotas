<template>
  <label :for="for" class="block text-sm font-medium mb-1 text-foreground/80">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  for: string
}>()
</script>
