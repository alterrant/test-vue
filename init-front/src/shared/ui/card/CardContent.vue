<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  class?: string
}>()

const delegatedClass = computed(() => cn('p-6 pt-0', props.class))
</script>

<template>
  <div :class="delegatedClass">
    <slot />
  </div>
</template>
