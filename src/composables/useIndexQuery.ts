import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'

type Service<T> = (config?: AxiosRequestConfig) => Promise<AxiosResponse<Array<T>>>

type Options = {
  config?: AxiosRequestConfig
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
}
const useIndexQuery = <T>(serviceMethod: Service<T>, options: Options = {}) => {
  const items = ref<Array<T>>()
  const loading = ref(false)

  const fetch = async () => {
    loading.value = true
    try {
      const { data } = await serviceMethod(options.config || {}) as AxiosResponse<Array<T>>
      if (data) items.value = data
      if (options.onSuccess) options.onSuccess()
    } catch (err) {
      if (options.onError) options.onError()
    } finally {
      if (options.onSettled) options.onSettled()
      loading.value = false
    }
  }

  onMounted(() => fetch())

  return { fetch, loading, items }
}

export default useIndexQuery
