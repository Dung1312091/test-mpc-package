import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  publicDir: false,
  build: {
    lib: {
      entry: {
       index :resolve(__dirname, 'lib/index.ts'),
       'wasm_exec': resolve(__dirname, 'lib/wasmLoader/wasm_exec.js')
      },
      formats: ['es'],
    },
    sourcemap: true
  }
})

