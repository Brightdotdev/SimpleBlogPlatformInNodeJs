import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:3232',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
  