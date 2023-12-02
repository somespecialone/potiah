import { resolve } from 'node:path'
import { readFileSync, appendFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

// append global.d.ts to output types declaration
function appendPlugin(): Plugin {
  return {
    name: 'append-plugin',
    async writeBundle(options) {
      try {
        const dFilePath = resolve(options.dir, pkg.types.split('/')[1])
        const dFile = readFileSync(dFilePath, { encoding: 'utf-8' })
        if (dFile) {
          const toAppend = readFileSync(resolve(__dirname, 'src/global.d.ts'), { encoding: 'utf-8' })
          appendFileSync(dFilePath, toAppend.split('\n').slice(1).join('\n'))
        }
      } catch (e) {
        //
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), ...(mode === 'bundled' ? [] : [dts({ rollupTypes: true }), appendPlugin()])],
    build: {
      emptyOutDir: mode === 'bundled',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Potiah',
        formats: mode === 'bundled' ? ['umd'] : ['es', 'cjs'],
        fileName: (f) => `${pkg.name}.${f === 'es' ? 'mjs' : f === 'cjs' ? f : `${f}.js`}`
      },
      rollupOptions: {
        external: ['vue', ...(mode === 'bundled' ? [] : ['locomotive-scroll'])],
        output: {
          globals: mode === 'bundled' ? { vue: 'Vue', 'locomotive-scroll': 'LocomotiveScroll' } : {}
        }
      }
    }
  }
})
