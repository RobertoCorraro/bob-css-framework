import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/bob.css',
      output: {
        assetFileNames: 'bob.min.css'
      }
    }
  }
})
