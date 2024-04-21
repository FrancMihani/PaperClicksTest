import apiClient from '@/clients/apiClient'
import type { UserPayload } from '@/services/users/types'

const UsersService = {
  all: () => apiClient().get<Array<unknown>>('users'),
  find: (id: string) => apiClient().get<unknown>(`users/${id}`),
  create: (payload: UserPayload) => apiClient().post('users', payload),
  update: (id: string, payload: UserPayload) => apiClient().put(`users/${id}`, payload),
  delete: (id: string) => apiClient().delete(`users/${id}`),
}

export default UsersService
