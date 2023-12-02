import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import 'locomotive-scroll/locomotive-scroll.css'
import { createPotiah } from 'potiah'

import App from './App.vue'
import HomeRoute from '@/pages/HomeRoute.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/lazy',
      name: 'lazy',
      component: () => import('@/pages/LazyRoute.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeRoute
    }
  ]
})

app.use(createPotiah())
app.use(router)

app.mount('#app')
