import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 72, progressive: true },
      jpeg: { quality: 72, progressive: true },
      png: { quality: 78 },
      webp: { quality: 78 },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
            return 'vendor-react';
          }
          return undefined;
        },
      },
    },
  },
})
