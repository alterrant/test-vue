import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { fetchProjects } from '../api/project-api'

import type { Project } from './types'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const featured = computed(() => projects.value.slice(0, 2))

  async function load() {
    if (projects.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      projects.value = await fetchProjects()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  function getBySlug(slug: string): Project | undefined {
    return projects.value.find((p) => p.slug === slug)
  }

  function reset() {
    projects.value = []
    error.value = null
  }

  return { projects, featured, loading, error, load, getBySlug, reset }
})
