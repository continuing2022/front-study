import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import MyPlugin from './src/plugin/MyPlugin'
// import fileSizePlugin from './src/plugin/fileSize'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), new MyPlugin()],
  base: './', 
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['monaco-editor']
  },
  resolve:{
    alias:{
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor']
        }
      }
    }
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  }
})
