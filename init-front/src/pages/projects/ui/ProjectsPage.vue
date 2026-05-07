<script setup lang="ts">
import { onMounted } from 'vue'

import { useProjectStore } from '@/entities/project'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { PageHeaderTemplate, PageTemplate } from '@/shared/ui/templates'

const projectStore = useProjectStore()

onMounted(() => {
  void projectStore.load()
})
</script>

<template>
  <PageTemplate>
    <PageHeaderTemplate title="All projects"
      description="Full list loaded from the API. Anchor links jump to a project card." />

    <div v-if="projectStore.loading" class="grid gap-6 md:grid-cols-2">
      <div v-for="i in 4" :key="i" class="h-64 animate-pulse rounded-lg bg-muted" />
    </div>

    <p v-else-if="projectStore.error" class="text-sm text-destructive">{{ projectStore.error }}</p>

    <div v-else class="grid gap-8 md:grid-cols-2">
      <Card v-for="project in projectStore.projects" :id="project.slug" :key="project.id"
        class="scroll-mt-28 border-border/60 bg-card/90 overflow-hidden">
        <div class="relative aspect-video w-full  border-b border-border/60 bg-secondary/30">
          <img :src="project.imageUrl" :alt="project.title" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <CardHeader>
          <CardTitle class="font-display text-2xl">{{ project.title }}</CardTitle>
          <CardDescription>{{ project.shortDescription }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-sm leading-relaxed text-muted-foreground">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2">
            <Badge v-for="t in project.tech" :key="t" variant="outline">{{ t }}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </PageTemplate>
</template>
