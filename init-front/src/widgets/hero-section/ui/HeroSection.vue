<script setup lang="ts">
import { onMounted } from 'vue'

import { useProfileStore } from '@/entities/profile'
import { Badge } from '@/shared/ui/badge'
import { RouterLink } from 'vue-router'

const profileStore = useProfileStore()

onMounted(() => {
  void profileStore.load()
})
</script>

<template>
  <section id="hero" class="relative scroll-mt-24 overflow-hidden border-b border-border/40 py-20 md:py-28">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,59,46,0.15),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(30,24,20,0.9),_hsl(20_14%_8%))]"
      aria-hidden="true" />
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border border-primary/20" />
    <div class="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full border border-border/60" />

    <div class="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 text-center md:px-6">
      <div class="relative">
        <div
          class="mx-auto flex size-40 items-center justify-center rounded-full border-2 border-primary/60 bg-secondary/40 shadow-[0_0_0_1px_rgba(196,59,46,0.25)] md:size-48">
          <span class="font-display text-4xl font-bold text-primary md:text-5xl">侍</span>
        </div>
        <div
          class="absolute -bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div v-if="profileStore.loading" class="space-y-4">
        <div class="mx-auto h-8 w-64 animate-pulse rounded bg-muted" />
        <div class="mx-auto h-6 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div v-else-if="profileStore.profile" class="space-y-6">
        <Badge variant="outline" class="border-primary/40 text-primary">
          {{ profileStore.profile.location }}
        </Badge>
        <h1 class="font-display text-4xl font-semibold tracking-tight text-paper md:text-6xl">
          {{ profileStore.profile.heroTitle }}
        </h1>
        <p class="max-w-2xl text-lg text-muted-foreground md:text-xl">
          {{ profileStore.profile.name }} — {{ profileStore.profile.tagline }}
        </p>
        <p class="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {{ profileStore.profile.bio }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <RouterLink :to="{ path: '/', hash: '#projects' }"
            class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            View projects
          </RouterLink>
          <RouterLink to="/skills"
            class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            All skills
          </RouterLink>
        </div>
      </div>

      <p v-else-if="profileStore.error" class="text-sm text-destructive">
        {{ profileStore.error }}
      </p>
    </div>
  </section>
</template>
