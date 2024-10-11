<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isVisible'])

const isVisible = ref(props.isVisible)

const sheet = ref<HTMLElement | null>(null)

watch(
  () => props.isVisible,
  (newValue) => {
    isVisible.value = newValue
  }
)

function toggleSheet(event: MouseEvent) {
  event.stopPropagation()
  isVisible.value = !isVisible.value
  emit('update:isVisible', isVisible.value)
}

function handleClickOutside(event: MouseEvent) {
  if (isVisible.value && sheet.value && !sheet.value.contains(event.target as Node)) {
    isVisible.value = false
    emit('update:isVisible', false)
  }
}

onClickOutside(sheet, handleClickOutside)
// onMounted(() => {
//   window.addEventListener('click', handleClickOutside)
// })

// onUnmounted(() => {
//   window.removeEventListener('click', handleClickOutside)
// })
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

  <!-- Sheet Slot-->
  <div
    ref="sheet"
    class="fixed top-0 right-0 w-80 h-full bg-background text-foreground shadow z-50 transition-transform duration-300"
    :class="{ 'translate-x-0': isVisible, 'translate-x-full': !isVisible }"
  >
    <!-- Close Button -->
    <transition name="slide">
      <div
        v-if="isVisible"
        class="absolute top-2 right-2 size-8 z-50 text-foreground flex items-center justify-center transition-all duration-500 cursor-pointer hover:bg-border/25"
        @click="toggleSheet"
      >
        <div class="scale-150 -mt-1">✕</div>
      </div>
    </transition>
    <slot v-if="isVisible" name="content"></slot>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transform: rotate(45deg);
  /* transition: transform 0.1s ease-in-out; */
}

.slide-enter-from,
.slide-leave-to {
  transform: rotate(45deg);
  transform: translateX(100px);
}
</style>
