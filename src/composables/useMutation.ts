import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { type AxiosResponse } from 'axios'

type Service<TPayload> = (payload: TPayload, id?: string) => Promise<AxiosResponse<unknown, any>>

type Options = {
  id?: string
  withoutToast?: boolean
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
}

const useMutation = <TPayload>(service: Service<TPayload>, options: Options = {}) => {
  const loading = ref(false)
  const toast = useToast()

  const mutate =  async (payload: TPayload) => {
    loading.value = true
    try {
      const { data } = options?.id ? await service(payload, options?.id) : await service(payload)
      if (data) {
        if (options.onSuccess) options.onSuccess()
        if (!options?.withoutToast) toast.success(data?.data)
      }
    } catch (error) {
      if (options.onError) options.onError()
      if (!options?.withoutToast) toast.error(error?.response?.data)
    } finally {
      if (options.onSettled) options.onSettled()
    }
  }

  return { loading, mutate }
}

export default useMutation
