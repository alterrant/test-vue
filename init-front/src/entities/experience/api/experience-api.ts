import { apiClient } from '@/shared/api/client'

import type { Experience } from '../model/types'

export async function fetchExperiences(): Promise<Experience[]> {
  const { data } = await apiClient.get<Experience[]>('/experiences')
  return data
}
