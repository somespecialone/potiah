import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // hmr mode - enable alias to lib's sources
  return {
    plugins: [vue()],
    optimizeDeps: mode === 'hmr' ? { exclude: ['potiah'] } : {},
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ...(mode === 'hmr' ? { potiah: resolve(__dirname, '../lib/src/index.ts') } : {})
      }
    }
  }
})
