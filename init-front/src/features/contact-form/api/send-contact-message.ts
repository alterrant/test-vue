import { apiClient } from '@/shared/api/client'

export interface ContactMessagePayload {
  email: string
  subject: string
  body: string
}

export interface ContactMessage extends ContactMessagePayload {
  id: number
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<ContactMessage> {
  const body = {
    id: Date.now(),
    ...payload,
  }
  const { data } = await apiClient.post<ContactMessage>('/messages', body)
  return data
}
