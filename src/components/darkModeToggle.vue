<script setup lang="ts">
import { watch } from 'vue'
import { useDarkModeStore } from '@/stores/dark-mode'

const darkModeStore = useDarkModeStore()

const darkModeButtonClasses =
  'bg-foreground rounded-full p-2 border-border border-2 shadow-lg hover:scale-125 transition-all duration-300 cursor-pointer'

watch(
  () => darkModeStore.isDarkMode,
  () => {
    document.documentElement.classList.toggle('dark', !darkModeStore.isDarkMode)
  }
)
</script>

<template>
  <div class="absolute bottom-10 right-10">
    <button
      v-if="darkModeStore.isDarkMode"
      @click="darkModeStore.toggleDarkMode"
      :class="darkModeButtonClasses"
    >
      🌜
    </button>
    <button v-else @click="darkModeStore.toggleDarkMode" :class="darkModeButtonClasses">☀️</button>
  </div>
</template>
