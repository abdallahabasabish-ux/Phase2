import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    // نحمّل كل سيناريو ككتلة منفصلة حتى لا يُحمَّل التاريخ كله دفعة واحدة
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('data/scenarios')) return 'scenarios';
          if (id.includes('data/characters')) return 'characters';
        },
      },
    },
  },
});
