import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables";`
      }
    }
  },
  build: {
    rollupOptions: {
      input: "src/main.js"
    }
  },
  plugins: [svelte()],
})
