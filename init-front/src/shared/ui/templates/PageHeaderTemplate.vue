<script setup lang="ts">
import { type HTMLAttributes } from 'vue';

const { title, description } = defineProps<{
    class?: HTMLAttributes["class"]
    title: string
    description: string
}>()

</script>

<template>
    <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
            <h1 class="font-display text-3xl font-semibold text-paper md:text-4xl">{{ title }}</h1>
            <p class="mt-2 max-w-xl text-sm text-muted-foreground">
                {{ description }}
            </p>
        </div>
    </div>

    <slot />
</template>