<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  class?: string
}>()

const delegatedClass = computed(() => cn('flex flex-col space-y-1.5 p-6', props.class))
</script>

<template>
  <div :class="delegatedClass">
    <slot />
  </div>
</template>
