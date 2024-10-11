<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const sheet = ref<HTMLElement | null>(null)

const dashboardRight = ref(document.getElementById('dashboard')?.getBoundingClientRect().right)

function toggleSheet(event: MouseEvent) {
  event.stopPropagation()
  isVisible.value = !isVisible.value
}

function handleClickOutside(event: MouseEvent) {
  if (isVisible.value && sheet.value && !sheet.value.contains(event.target as Node)) {
    isVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Trigger -->
  <div @click="toggleSheet">
    <slot name="trigger"></slot>
  </div>

  <!-- Black overlay -->
  <div
    v-if="isVisible"
    ref="sheet"
    class="fixed top-0 right-0 w-full h-full bg-black z-40 transition-all duration-300"
    :class="{ 'opacity-75': isVisible, 'opacity-0': !isVisible }"
  />

  <!-- Sheet -->
  <div
    ref="sheet"
    class="fixed top-0 right-0 w-80 h-full bg-background text-foreground shadow z-50 transition-transform duration-300"
    :class="{ 'translate-x-0': isVisible, 'translate-x-full': !isVisible }"
  >
    <slot name="content"></slot>
  </div>
</template>
