import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchSkills } from '../api/skill-api'

import type { SkillCategory } from './types'

export const useSkillStore = defineStore('skill', () => {
  const categories = ref<SkillCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (categories.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      categories.value = await fetchSkills()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load skills'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    categories.value = []
    error.value = null
  }

  return { categories, loading, error, load, reset }
})
