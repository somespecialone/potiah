import { createApp } from 'vue'

import createVuecomotiveScroll from 'vuecomotive-scroll'

import App from './App.vue'

const app = createApp(App)

app.use(createVuecomotiveScroll())

app.mount('#app')
