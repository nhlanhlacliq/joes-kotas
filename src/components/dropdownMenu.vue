<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const menuTop = ref(0)

const trigger = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)

function toggleMenu(event: MouseEvent) {
  event.stopPropagation()
  isVisible.value = !isVisible.value

  if (isVisible.value) {
    calculatePosition(event)
  }
}

function calculatePosition(event: MouseEvent) {
  nextTick(() => {
    if (trigger.value && menu.value) {
      const menuHeight = menu.value.offsetHeight
      const triggerHeight = trigger.value.offsetHeight / 2
      const mouseY = event.clientY

      // Calc  available space below and above mouse position
      const spaceBelow = window.innerHeight - mouseY
      const spaceAbove = mouseY

      // Position the menu below or above the mouse position, trigger height used as extra space (padding)
      if (spaceBelow >= menuHeight + triggerHeight) {
        menuTop.value = mouseY + triggerHeight
      } else if (spaceAbove >= menuHeight + triggerHeight) {
        // space above
        menuTop.value = mouseY - menuHeight - triggerHeight
      } else {
        // Default to below if not enough space - dont include triggerHeight padding
        menuTop.value = mouseY
      }
    }
  })
}

function handleClickOutside() {
  if (isVisible.value) {
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
  <div @click="toggleMenu" ref="trigger" class="inline-block">
    <slot name="trigger"></slot>
  </div>

  <!-- Dropdown Menu -->
  <div
    v-if="isVisible"
    class="absolute bg-background text-foreground border p-2 z-10 min-w-32 shadow rounded"
    :style="{ top: menuTop + 'px' }"
    ref="menu"
  >
    <slot name="menu"></slot>
  </div>
</template>
