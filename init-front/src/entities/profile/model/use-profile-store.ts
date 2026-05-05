import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchProfile } from '../api/profile-api'

import type { Profile } from './types'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (profile.value) return
    loading.value = true
    error.value = null
    try {
      profile.value = await fetchProfile()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load profile'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    profile.value = null
    error.value = null
  }

  return { profile, loading, error, load, reset }
})
