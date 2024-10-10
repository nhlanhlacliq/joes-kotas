<script setup lang="ts">
import ButtonComponent from '../components/ui/buttonComponent.vue'
import MainContainer from '@/components/mainContainer.vue'
</script>

<template>
  <MainContainer>
    <h1 class="text-4xl font-bold text-foreground">Joe's Kotas Dashboard 🍞</h1>
    <router-link to="/">
      <ButtonComponent class="w-32"> Logout </ButtonComponent>
    </router-link>
  </MainContainer>
</template>
