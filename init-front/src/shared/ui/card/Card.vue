<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  class?: string
}>()

const delegatedClass = computed(() =>
  cn(
    [
      'rounded-lg border border-border bg-card text-card-foreground shadow',
      // Keep a subtle ring in dark mode; shadow color is controlled via CSS variables.
      'dark:border-border/80 dark:ring-1 dark:ring-white/5 dark:shadow-md',
    ],
    props.class,
  ),
)
</script>

<template>
  <div :class="delegatedClass">
    <slot />
  </div>
</template>
