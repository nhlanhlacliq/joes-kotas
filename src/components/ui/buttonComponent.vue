<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String as () => 'default' | 'destructive' | 'outline' | 'ghost' | 'dark',
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
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2'

  const variantClasses = {
    default: 'bg-primary text-foreground dark:text-background hover:bg-primary/90',
    dark: 'bg-foreground text-background hover:bg-foreground/90',
    destructive: 'bg-destructive text-background dark:text-foreground hover:bg-destructive/90',
    outline: 'border border-border bg-background text-foreground hover:bg-background/90',
    ghost: 'bg-transparent text-foreground hover:bg-border/25'
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${props.class}`
})
</script>

<template>
  <button :class="classes" @click="buttonClick">
    <slot />
  </button>
</template>
