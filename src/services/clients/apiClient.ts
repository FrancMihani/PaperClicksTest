import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import merge from 'lodash/merge'

const defaultOptions = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export default (axiosOptions: AxiosRequestConfig = {}): AxiosInstance => {
  const options = merge(defaultOptions, axiosOptions)
  return axios.create(options)
}
