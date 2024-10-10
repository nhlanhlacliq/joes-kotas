<script setup lang="ts">
import ButtonComponent from '../components/ui/buttonComponent.vue'
</script>

<template>
  <main class="g-background text-foregound w-full h-screen flex flex-col p-6">
    <div class="flex justify-between w-full">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-foreground">Dashboard 🍞</h1>
      <router-link to="/">
        <ButtonComponent class="w-32"> Logout </ButtonComponent>
      </router-link>
    </div>
  </main>
</template>
