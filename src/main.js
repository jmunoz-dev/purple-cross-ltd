import './styles/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import plugin from './plugin'

const init = async () => {
  try {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

    createApp(App).use(pinia).use(router).use(plugin).mount('#app')
  } catch (err) {
    // Handle any errors that occurred during the initialization
    console.error('Error initializing the app:', err)
  }
}

init()
