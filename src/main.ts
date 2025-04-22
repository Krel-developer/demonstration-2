import { createApp } from 'vue'

import App from './app/App.vue'
import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'

const pinia = createPinia()

pinia.use(
  PiniaLogger({
    expanded: true,
    disabled: true,
    // use a filter to only log certain actions
  })
)

createApp(App).use(pinia).mount('#app')
