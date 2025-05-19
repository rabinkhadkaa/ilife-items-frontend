import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <- RELATIVE path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
