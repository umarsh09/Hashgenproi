import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  // Environment variables with VITE_ prefix are automatically exposed
  // via import.meta.env.VITE_* - no manual define needed
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // Optimize build performance
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false
  }
});
