import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import modify from 'rollup-plugin-modify'

export default defineConfig({
  plugins: [
    vue(),
    // patch Locomotive Scroll
    modify({
      'wrapper: window,': '\n',
      'content: document.documentElement,': '\n',
      'eventsTarget: window,': '\n'
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Potiah'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: 'lenis.css',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
