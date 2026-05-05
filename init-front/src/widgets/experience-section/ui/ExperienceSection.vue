<script setup lang="ts">
import { onMounted } from 'vue'

import { useExperienceStore } from '@/entities/experience'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const experienceStore = useExperienceStore()

onMounted(() => {
  void experienceStore.load()
})
</script>

<template>
  <section id="experience" class="scroll-mt-24 border-b border-border/40 py-20 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <div class="mb-12 text-center">
        <h2 class="font-display text-3xl font-semibold tracking-wide text-paper md:text-4xl">
          WORK EXPERIENCE
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">Internships and roles — mirrored from the Figma block.</p>
      </div>

      <div v-if="experienceStore.loading" class="mx-auto max-w-2xl space-y-4">
        <div v-for="i in 2" :key="i" class="h-40 animate-pulse rounded-lg bg-muted" />
      </div>

      <p v-else-if="experienceStore.error" class="text-center text-sm text-destructive">
        {{ experienceStore.error }}
      </p>

      <div v-else class="mx-auto flex max-w-3xl flex-col gap-8">
        <Card
          v-for="exp in experienceStore.experiences"
          :key="exp.id"
          class="border-border/60 bg-card text-left"
        >
          <CardHeader>
            <p class="text-xs font-semibold uppercase tracking-widest text-primary">
              {{ exp.dateRange }}
            </p>
            <CardTitle class="font-display text-2xl">{{ exp.title }}</CardTitle>
            <CardDescription class="text-base text-foreground/80">{{ exp.company }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ exp.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
