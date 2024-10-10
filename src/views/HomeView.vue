<script setup lang="ts">
import MainContainer from '@/components/mainContainer.vue'
import ButtonComponent from '../components/ui/buttonComponent.vue'
</script>

<template>
  <MainContainer>
    <div class="flex flex-col gap-6 items-center">
      <h1 class="text-4xl font-bold text-foreground">Welcome to Joe's Kota's 🍞</h1>
      <p class="text-xl text-foreground/50 text-balance">
        The ultimate dashboard for managing your inventory
      </p>
      <div class="flex gap-6 justify-center">
        <router-link to="/register">
          <ButtonComponent variant="outline" class="w-32"> Sign up </ButtonComponent>
        </router-link>
        <router-link to="/login">
          <ButtonComponent class="w-32"> Login </ButtonComponent>
        </router-link>
      </div>
    </div>
  </MainContainer>
</template>
