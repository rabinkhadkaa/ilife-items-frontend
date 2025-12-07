import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    historyApiFallback: true,   // 🔥 Needed to support refresh on /item/1
    proxy: {
      '/api': 'http://localhost:8081' // Slim backend URL (for local dev)
    }
  },

  preview: {
    historyApiFallback: true   // Also required when running `vite preview`
  }
});
