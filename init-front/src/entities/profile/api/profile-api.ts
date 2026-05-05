import { apiClient } from '@/shared/api/client'

import type { Profile } from '../model/types'

export async function fetchProfile(): Promise<Profile> {
  const { data } = await apiClient.get<Profile>('/profile')
  return data
}
