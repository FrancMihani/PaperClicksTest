import { type AxiosResponse } from 'axios'
import { onMounted, type Ref, ref, watch } from 'vue'

type Service<T> = (id: string) => Promise<AxiosResponse<T, any>>

type Options<T> = {
  id: string
  onSuccess?: () => void
  onError?: () => void
  onSettled?: () => void
  fetchOnMounted?: boolean
  initialItem?: T
}
const useQuery = <T>(serviceMethod: Service<T>, options: Options<T>) => {
  const item = ref<T>((options?.initialItem || {}) as T) as Ref<T>
  const loading = ref(false)

  const fetch = async () => {
    loading.value = true
    try {
      const { data } = await serviceMethod(options.id)
      if (data) item.value = data
      if (options.onSuccess) options.onSuccess()
    } catch (err) {
      if (options.onError) options.onError()
    } finally {
      if (options.onSettled) options.onSettled()
      loading.value = false
    }
  }

  onMounted(() => {
    if (options.fetchOnMounted) fetch()
  })

  watch(
    [options.id],
    () => {
      if (options.id) fetch()
    },
    { deep: true },
  )

  return { fetch, loading, item }
}

export default useQuery
