import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchExperiences } from '../api/experience-api'

import type { Experience } from './types'

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref<Experience[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (experiences.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      experiences.value = await fetchExperiences()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load experience'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    experiences.value = []
    error.value = null
  }

  return { experiences, loading, error, load, reset }
})
