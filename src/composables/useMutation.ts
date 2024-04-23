import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { type AxiosResponse } from 'axios'

type Service<TPayload> = (payload: TPayload, id?: string) => Promise<AxiosResponse<TPayload, any>>

type Options = {
  withoutToast?: boolean
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
}

const useMutation = <TPayload>(service: Service<TPayload>, options: Options) => {
  const loading = ref(false)
  const toast = useToast()

  const mutate = async (payload: TPayload, id?: string) => {
    loading.value = true
    try {
      const { data } = id ? await service(payload, id) : await service(payload)
      if (data) {
        if (options.onSuccess) options.onSuccess()
        if (!options?.withoutToast) toast.success('Success')
      }
    } catch (error) {
      if (options.onError) options.onError()
      if (!options?.withoutToast) toast.error(error)
    } finally {
      if (options.onSettled) options.onSettled()
    }
  }

  return { loading, mutate }
}

export default useMutation
