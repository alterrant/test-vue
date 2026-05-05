import { apiClient } from '@/shared/api/client'

import type { SkillCategory } from '../model/types'

export async function fetchSkills(): Promise<SkillCategory[]> {
  const { data } = await apiClient.get<SkillCategory[]>('/skills')
  return data
}
