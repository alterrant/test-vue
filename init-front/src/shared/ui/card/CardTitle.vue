<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  class?: string
}>()

const delegatedClass = computed(() => cn('text-2xl font-semibold leading-none tracking-tight', props.class))
</script>

<template>
  <h3 :class="delegatedClass">
    <slot />
  </h3>
</template>
