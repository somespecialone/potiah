import { defineConfig } from 'vitepress'

import pkg from '../../lib/package.json'

export default defineConfig({
  title: 'Potiah',
  lang: 'en',
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
        link: 'https://stackblitz.com/github/somespecialone/potiah/tree/main/playground/?file=src%2Fpages%2FHomeRoute.vue&title=Potiah%20Playground'
      },
      { text: pkg.version, link: 'https://github.com/somespecialone/potiah/releases/tag/v' + pkg.version },
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
          { text: 'Potiah', link: '/core/potiah' },
          { text: 'ScrollView', link: '/core/scroll-view' },
          { text: 'ScrollComponent', link: '/core/scroll-component' },
          { text: 'usePotiah', link: '/core/use-potiah' }
        ]
      },
      {
        text: 'SSR',
        items: [
          { text: 'Compatability', link: '/ssr/compatability' },
          { text: 'Nuxt.js', link: '/ssr/nuxt' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/somespecialone/potiah' }],
    editLink: {
      pattern: 'https://github.com/somespecialone/potiah/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },
  markdown: { theme: { light: 'material-theme-lighter', dark: 'material-theme-darker' } },
  sitemap: { hostname: 'https://potiah.somespecialone.one' },
  cleanUrls: true
})
