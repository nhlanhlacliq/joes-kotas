<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String as () => 'default' | 'destructive' | 'outline' | 'dark',
    default: 'default'
  },
  class: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])

function buttonClick() {
  emit('click')
}

const classes = computed(() => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2'

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    dark: 'bg-foreground text-background hover:bg-foreground/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-border bg-background text-foreground hover:bg-background/90'
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${props.class}`
})
</script>

<template>
  <button :class="classes" @click="buttonClick">
    <slot />
  </button>
</template>
