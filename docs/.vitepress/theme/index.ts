// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

import 'vuecomotive-scroll/dist/lenis.css'
import createVuecomotiveScroll from 'vuecomotive-scroll'

// @ts-ignore
import Layout from './components/ScrollLayout.vue'
// @ts-ignore
import DocButton from './components/DocButton.vue'

export default <Theme>{
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DocButton', DocButton)

    app.use(createVuecomotiveScroll())
  }
}
