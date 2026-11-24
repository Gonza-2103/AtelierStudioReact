import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setupTests.js',
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'html'],
      reportOnFailure: true,
      exclude: [
        'src/assets/**',
        'src/styles/**',
        'src/testing/**',
        'node_modules/**',
        '**/*.css',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg'
      ],
    },
  },
});

