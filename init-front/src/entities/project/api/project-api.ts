import { apiClient } from '@/shared/api/client'

import type { Project } from '../model/types'

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await apiClient.get<Project[]>('/projects')
  return data
}
