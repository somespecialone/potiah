import { defineConfig } from 'vitepress'

// @ts-ignore
import pkg from '../../lib/package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vuecomotive',
  description: 'Vue.js wrapper for Locomotive Scroll',
  appearance: 'dark',
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/reference' },
      { text: pkg.version, link: 'https://github.com/somespecialone/vuecomotive-scroll/releases/tag/v' + pkg.version },
      { text: '#StandWithUkraine', link: 'https://stand-with-ukraine.pp.ua/' }
    ],
    sidebar: {
      '/guide/': [
        {
          collapsed: false,
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Creating scroll view', link: '/guide/creating-scroll-view' }
          ]
        }
      ],
      '/reference/': []
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/somespecialone/vuecomotive-scroll' }],
    editLink: {
      pattern: 'https://github.com/somespecialone/vuecomotive-scroll/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
