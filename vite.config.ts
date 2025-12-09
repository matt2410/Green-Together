import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.openaq.org",        // API target
        changeOrigin: true,                     // bypass CORS
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "")  // remove /api trước khi gửi đi
      }
    }
  }
})
