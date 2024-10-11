<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)

setInterval(() => {
  count.value === 4 ? (count.value = 1) : count.value++
}, 100)
</script>

<template>
  <p v-if="count === 1" class="opacity-85">Loading</p>
  <p v-else-if="count === 2" class="">Loading.</p>
  <p v-else-if="count === 3" class="opacity-85">Loading..</p>
  <p v-else-if="count === 4" class="">Loading...</p>
</template>
