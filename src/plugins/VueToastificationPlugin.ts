import { type Plugin } from 'vue'
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  timeout: 5000,
  closeButton: false,
}

export default {
  install: (app) => {
    app.use(Toast, options)
  }
} as Plugin
