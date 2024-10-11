<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>()
</script>

<template lang="">
  <div class="p-3 px-2 flex gap-3 cursor-pointer hover:bg-border/25">
    <div>{{ icon }}</div>
    <div>{{ label }}</div>
  </div>
</template>
