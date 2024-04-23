import apiClient from '@/clients/apiClient'
import type { UserDTO, UserPayload } from '@/services/users/types'

const UsersService = {
  all: () => apiClient().get<Array<UserDTO>>('users'),
  find: (id: string) => apiClient().get<UserDTO>(`users/${id}`),
  create: (payload: UserPayload) => apiClient().post('users', payload),
  update: (payload: UserPayload, id?: string) => apiClient().put(`users/${id}`, payload),
  delete: (id: string) => apiClient().delete(`users/${id}`),
}

export default UsersService
