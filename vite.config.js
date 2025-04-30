import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/My-Love/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
  }
}) 