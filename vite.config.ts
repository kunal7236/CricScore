import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/mcenter': {
        target: 'https://www.cricbuzz.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/live-matches-index': {
        target: 'https://www.cricbuzz.com/cricket-match/live-scores',
        changeOrigin: true,
        secure: false,
        rewrite: () => ''
      }
    }
  }
})