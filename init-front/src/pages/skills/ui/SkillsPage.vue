<script setup lang="ts">
import { onMounted } from 'vue'

import { useSkillStore } from '@/entities/skill'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { PageHeaderTemplate, PageTemplate } from '@/shared/ui/templates'

const skillStore = useSkillStore()

onMounted(() => {
  void skillStore.load()
})
</script>

<template>
  <PageTemplate>
    <PageHeaderTemplate title="All skills"
      description="Same categories as the home section, expanded for a dedicated route." />

    <div v-if="skillStore.loading" class="grid gap-6 md:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-56 animate-pulse rounded-lg bg-muted" />
    </div>

    <p v-else-if="skillStore.error" class="text-sm text-destructive">{{ skillStore.error }}</p>

    <div v-else class="grid gap-6 md:grid-cols-3">
      <Card v-for="cat in skillStore.categories" :key="cat.id" class="border-border/60 bg-card/90">
        <CardHeader>
          <CardTitle class="text-xl capitalize text-primary">{{ cat.category }}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li v-for="item in cat.items" :key="item" class="flex items-center gap-2">
              <span class="size-1.5 rounded-full bg-primary" />
              <span class="capitalize">{{ item }}</span>
            </li>
          </ul>
          <div class="mt-4 flex flex-wrap gap-2">
            <Badge v-for="item in cat.items" :key="`${cat.id}-${item}`" variant="muted" class="capitalize">
              {{ item }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </PageTemplate>
</template>
