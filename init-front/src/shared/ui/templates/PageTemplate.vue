<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes["class"]
}>()
</script>

<template>
    <div :class="cn('py-16 md:py-20 mx-auto max-w-6xl px-4 md:px-6', props.class)">
        <slot />
    </div>
</template>