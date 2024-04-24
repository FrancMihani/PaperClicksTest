import { type AxiosResponse } from 'axios'
import { type Ref, ref } from 'vue'

type Service<T> = (id: string) => Promise<AxiosResponse<T, any>>

type Options<T> = {
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
  initialItem?: T
}
const useQuery = <T>(serviceMethod: Service<T>, options?: Options<T>) => {
  const item = ref<T>((options?.initialItem || {}) as T) as Ref<T>
  const loading = ref(false)

  const fetch = async (id: string) => {
    loading.value = true
    try {
      const { data } = await serviceMethod(id)
      if (data) item.value = data
      if (options?.onSuccess) options.onSuccess()
    } catch (err) {
      if (options?.onError) options.onError()
    } finally {
      if (options?.onSettled) options.onSettled()
      loading.value = false
    }
  }

  return { fetch, loading, item }
}

export default useQuery
