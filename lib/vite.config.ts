import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuecomotiveScroll'
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
