<script setup lang="ts">
import { RouterView } from 'vue-router'
import DarkModeToggle from './components/darkModeToggle.vue'
import { useDarkModeStore } from './stores/dark-mode'

const darkModeStore = useDarkModeStore()
</script>

<template>
  <div class="bg-background">
    <main class="max-w-screen-xl mx-auto bg-background">
      <RouterView v-slot="{ Component }">
        <transition :name="darkModeStore.isDarkMode ? 'slide' : 'dark'" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
      <DarkModeToggle />
    </main>
  </div>
</template>

<style></style>
