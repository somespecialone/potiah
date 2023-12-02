// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

import 'potiah/dist/lenis.css'
import createPotiah from 'potiah'

// @ts-ignore
import Layout from './ScrollLayout.vue'
// @ts-ignore
import DocButton from './components/DocButton.vue'

export default <Theme>{
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DocButton', DocButton)

    app.use(createPotiah())
  }
}
