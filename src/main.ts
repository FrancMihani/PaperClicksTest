import './assets/main.css'
import VueToastificationPlugin from "@/plugins/VueToastificationPlugin"
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(VueToastificationPlugin)
  .mount('#app')
