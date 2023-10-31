import { defineConfig } from 'vitepress'

// @ts-ignore
import pkg from '../../lib/package.json'

export default defineConfig({
  title: 'Vuecomotive',
  description: 'Vue.js wrapper for Locomotive Scroll',
  appearance: 'dark',
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    search: { provider: 'local' },
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Core', link: '/core/scroll' },
      {
        text: 'Playground',
        link: 'https://stackblitz.com/github/somespecialone/vuecomotive-scroll/tree/master/demo/?file=src%2FApp.vue'
      },
      { text: pkg.version, link: 'https://github.com/somespecialone/vuecomotive-scroll/releases/tag/v' + pkg.version },
      { text: 'Support Ukraine', link: 'https://war.ukraine.ua/support-ukraine/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Creating scroll scene', link: '/guide/creating-scroll-scene' }
        ]
      },
      {
        text: 'Core',
        items: [
          { text: 'Scroll', link: '/core/scroll' },
          { text: 'ScrollView', link: '/core/scroll-view' },
          { text: 'ScrollComponent', link: '/core/scroll-component' },
          { text: 'useScroll', link: '/core/use-scroll' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/somespecialone/vuecomotive-scroll' }],
    editLink: {
      pattern: 'https://github.com/somespecialone/vuecomotive-scroll/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },
  markdown: { theme: 'material-theme' }
})
