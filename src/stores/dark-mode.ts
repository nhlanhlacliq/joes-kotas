import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkModeStore = defineStore('dark-mode', () => {
  const isDarkMode = ref(true)
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  return { isDarkMode, toggleDarkMode }
})
