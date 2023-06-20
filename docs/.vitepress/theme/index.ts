// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

import 'vuecomotive-scroll/dist/lenis.css'
import createVuecomotiveScroll from 'vuecomotive-scroll'

// @ts-ignore
import IndexLayout from './components/ScrollLayout.vue'

export default <Theme>{
  ...DefaultTheme,
  Layout: IndexLayout,
  enhanceApp({ app, router, siteData }) {
    app.use(createVuecomotiveScroll())
  }
}
