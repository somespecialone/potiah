import { defineConfig } from 'vitepress'

// @ts-ignore
import pkg from '../../lib/package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vuecomotive',
  description: 'Vue.js wrapper for precious Locomotive scroll 🚂',
  appearance: 'dark',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' },
      { text: pkg.version, link: 'https://github.com/somespecialone/vuecomotive-scroll/releases/tag/v' + pkg.version },
      { text: '#StandWithUkraine', link: 'https://stand-with-ukraine.pp.ua/' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/somespecialone/vuecomotive-scroll' }],
    // footer: {
    //   copyright: '© 2023 Dmytro Tkachenko',
    //   message: 'Released under the MIT License.'
    // },
    editLink: {
      pattern: 'https://github.com/somespecialone/vuecomotive-scroll/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
