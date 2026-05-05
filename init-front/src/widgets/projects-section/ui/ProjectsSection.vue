<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useProjectStore } from '@/entities/project'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'

const projectStore = useProjectStore()

onMounted(() => {
  void projectStore.load()
})
</script>

<template>
  <section id="projects" class="scroll-mt-24 border-b border-border/40 py-20 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <div class="mb-12 text-center">
        <h2 class="font-display text-3xl font-semibold tracking-wide text-paper md:text-4xl">
          MY PROJECTS
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">Featured work — data comes from json-server.</p>
      </div>

      <div v-if="projectStore.loading" class="grid gap-8 md:grid-cols-2">
        <div v-for="i in 2" :key="i" class="h-80 animate-pulse rounded-lg bg-muted" />
      </div>

      <p v-else-if="projectStore.error" class="text-center text-sm text-destructive">
        {{ projectStore.error }}
      </p>

      <div v-else class="grid gap-8 md:grid-cols-2">
        <Card
          v-for="project in projectStore.featured"
          :key="project.id"
          class="overflow-hidden border-border/60 bg-card/90"
        >
          <div class="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-secondary/30">
            <img
              :src="project.imageUrl"
              :alt="project.title"
              class="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
              loading="lazy"
            />
          </div>
          <CardHeader>
            <CardTitle class="font-display text-2xl">{{ project.title }}</CardTitle>
            <CardDescription>{{ project.shortDescription }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="t in project.tech" :key="t" variant="outline">{{ t }}</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <RouterLink
              :to="`/projects#${project.slug}`"
              class="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-3 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Details on projects page
            </RouterLink>
          </CardFooter>
        </Card>
      </div>

      <div class="mt-10 flex justify-center">
        <RouterLink
          to="/projects"
          class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See all projects
        </RouterLink>
      </div>
    </div>
  </section>
</template>
