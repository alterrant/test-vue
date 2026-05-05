<script setup lang="ts">
import { computed, ref } from 'vue'

import { sendContactMessage } from '../api/send-contact-message'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { cn } from '@/shared/lib/utils'

const email = ref('')
const subject = ref('')
const body = ref('')
const submitting = ref(false)
const success = ref(false)
const formError = ref<string | null>(null)

const canSubmit = computed(
  () => email.value.trim().length > 3 && subject.value.trim().length > 1 && body.value.trim().length > 3,
)

async function onSubmit() {
  if (!canSubmit.value || submitting.value) return
  formError.value = null
  success.value = false
  submitting.value = true
  try {
    await sendContactMessage({
      email: email.value.trim(),
      subject: subject.value.trim(),
      body: body.value.trim(),
    })
    success.value = true
    email.value = ''
    subject.value = ''
    body.value = ''
  } catch (e) {
    formError.value = e instanceof Error ? e.message : 'Could not send message'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="grid gap-6 md:grid-cols-[160px_1fr]" @submit.prevent="onSubmit">
    <div class="hidden md:flex md:flex-col md:gap-10 md:pt-2 md:text-sm md:font-medium md:text-muted-foreground">
      <span>email :</span>
      <span>subject :</span>
      <span>content :</span>
    </div>
    <div class="flex flex-col gap-6">
      <div class="space-y-2">
        <label class="text-sm text-muted-foreground md:hidden" for="contact-email">email</label>
        <Input
          id="contact-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
          class="h-12 border-border/80 bg-secondary/40"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-muted-foreground md:hidden" for="contact-subject">subject</label>
        <Input
          id="contact-subject"
          v-model="subject"
          type="text"
          placeholder="let’s have a coffee"
          required
          class="h-12 border-border/80 bg-secondary/40"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-muted-foreground md:hidden" for="contact-body">content</label>
        <Textarea
          id="contact-body"
          v-model="body"
          rows="6"
          placeholder="Tell me about your project…"
          required
          class="min-h-[180px] border-border/80 bg-secondary/40"
        />
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" :disabled="!canSubmit || submitting">
          {{ submitting ? 'Sending…' : 'Send message' }}
        </Button>
        <p v-if="success" class="text-sm text-primary">Message saved (json-server).</p>
        <p v-if="formError" :class="cn('text-sm text-destructive')">{{ formError }}</p>
      </div>
    </div>
  </form>
</template>
