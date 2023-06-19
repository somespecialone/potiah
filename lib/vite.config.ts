import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuecomotiveScroll',
      fileName: 'vuecomotive-scroll'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (a) => {
          return a.name == 'style.css' ? 'lenis.css' : a.name
        },
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
