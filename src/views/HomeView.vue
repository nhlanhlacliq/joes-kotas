<script setup lang="ts">
import ButtonComponent from '../components/ui/buttonComponent.vue'
</script>

<template>
  <main
    class="bg-background text-foregound w-full h-screen flex flex-col justify-center items-center"
  >
    <div class="flex flex-col gap-6 items-center">
      <h1 class="text-4xl font-bold text-foreground">Welcome to Joe's Kotas 🍞</h1>
      <p class="text-xl text-foreground/50 text-balance">
        The ultimate dashboard for managing your inventory
      </p>
      <div>
        <ButtonComponent variant="outline">Welcome</ButtonComponent>
      </div>
    </div>
  </main>
</template>
