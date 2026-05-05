<script setup lang="ts">
import { onMounted } from 'vue'

import { ContactForm } from '@/features/contact-form'
import { useProfileStore } from '@/entities/profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const profileStore = useProfileStore()

onMounted(() => {
  void profileStore.load()
})
</script>

<template>
  <section id="contact" class="scroll-mt-24 py-20 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <div class="mb-12 text-center">
        <h2 class="font-display text-3xl font-semibold tracking-wide text-paper md:text-4xl">
          CONTACT ME
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">
          Messages are persisted to <code class="rounded bg-muted px-1 py-0.5 text-xs">messages</code> via json-server.
        </p>
      </div>

      <Card class="mx-auto max-w-4xl border-border/60 bg-card/80">
        <CardHeader>
          <CardTitle class="font-display text-xl">Say hello</CardTitle>
          <CardDescription v-if="profileStore.profile">
            Prefer email? {{ profileStore.profile.email }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  </section>
</template>
