<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useSkillStore } from '@/entities/skill'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

const skillStore = useSkillStore()

onMounted(() => {
  void skillStore.load()
})
</script>

<template>
  <section id="skills" class="scroll-mt-24 border-b border-border/40 py-20 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <div class="mb-12 text-center">
        <h2 class="font-display text-3xl font-semibold tracking-wide text-paper md:text-4xl">
          MY SKILLS
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">Stack and craft, grouped like the reference layout.</p>
        <RouterLink
          to="/skills"
          class="mt-4 inline-block text-sm font-medium uppercase tracking-widest text-primary hover:underline"
        >
          Open full skills page
        </RouterLink>
      </div>

      <div v-if="skillStore.loading" class="grid gap-6 md:grid-cols-3">
        <div v-for="i in 3" :key="i" class="h-48 animate-pulse rounded-lg bg-muted" />
      </div>

      <div v-else-if="skillStore.error" class="text-center text-sm text-destructive">
        {{ skillStore.error }}
      </div>

      <div v-else class="grid gap-6 md:grid-cols-3">
        <Card
          v-for="cat in skillStore.categories"
          :key="cat.id"
          class="border-border/60 bg-card/80 backdrop-blur"
        >
          <CardHeader>
            <CardTitle class="text-lg capitalize text-primary">{{ cat.category }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex flex-wrap gap-2">
              <Badge v-for="item in cat.items" :key="item" variant="muted" class="capitalize">
                {{ item }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
