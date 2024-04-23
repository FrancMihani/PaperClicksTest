declare type Maybe<T> = null | undefined | T

declare type Header<TData> = {
  label: string
  key: keyof TData | 'actions'
}

declare type StatusResponse<TData> = {
  statusCode: number
  message: string
  data: TData
}

declare type PaginatedResponse<TItem> = {
  data: Array<TItem>
  message: string
  meta: {
    current_page: number
    from: number
    path: string
    per_page: number
    to: number
    total: number
    last_page: number
  }
}

declare type Params = Record<string, string | number | Array<string | number>> | string | number
