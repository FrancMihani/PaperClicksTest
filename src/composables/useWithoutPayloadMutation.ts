import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { type AxiosResponse } from 'axios'

type Service = (id?: string) => Promise<AxiosResponse<unknown, any>>

type Options = {
  id: string
  withoutToast?: boolean
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
}

const useWithoutPayloadMutation = <TPayload>(service: Service, options: Options) => {
  const loading = ref(false)
  const toast = useToast()

  const mutate = async () => {
    loading.value = true
    try {
      const { data } = await service(options?.id)
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

export default useWithoutPayloadMutation
